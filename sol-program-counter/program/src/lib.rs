use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{AccountInfo, next_account_info},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

#[derive(BorshSerialize, BorshDeserialize)]
struct Counter {
    count: u32,
}

#[derive(BorshSerialize, BorshDeserialize)]
enum CounterInstruction {
    Increment(u32),
    Decrement(u32),
}

entrypoint!(process_instruction);

pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let account = next_account_info(&mut accounts.iter())?;
    let mut counter = Counter::try_from_slice(&account.data.borrow())?;

    match CounterInstruction::try_from_slice(instruction_data) {
        Ok(instruction) => match instruction {
            CounterInstruction::Increment(amount) => {
                counter.count += amount;
            }
            CounterInstruction::Decrement(amount) => {
                counter.count = counter.count.saturating_sub(amount);
            }
        },
        Err(_) => return Err(ProgramError::InvalidInstructionData),
    }

    counter.serialize(&mut *account.data.borrow_mut())?;
    msg!("Counter updated to {}", counter.count);

    Ok(())
}
