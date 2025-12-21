use solana_program::{
    account_info::{AccountInfo, next_account_info},
    entrypoint,
    entrypoint::ProgramResult,
    program::invoke_signed,
    pubkey::Pubkey,
    rent::Rent,
    system_instruction::create_account,
    system_program::ID as SYSTEM_PROGRAM_ID,
    sysvar::Sysvar,
};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    let iter = &mut accounts.iter();
    let payer_account = next_account_info(iter)?;
    let payer_pubkey = payer_account.key;

    let space = 4;
    let rent = Rent::get()?;
    let lamports = rent.minimum_balance(space);

    let (pda, bump) =
        Pubkey::find_program_address(&[b"client", payer_pubkey.as_ref()], &program_id);

    let ix = create_account(
        &payer_account.key,
        &pda,
        lamports,
        space as u64,
        &SYSTEM_PROGRAM_ID,
    );

    let signer_seeds = &[b"client", payer_pubkey.as_ref(), &[bump]];

    invoke_signed(&ix, accounts, &[signer_seeds])?;

    Ok(())
}
