use anchor_lang::prelude::*;

declare_id!("DTxgjejWxGg4TtGGrWyLdH23GJPc77P9boE9aUpvyDNo");

pub mod calculator {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.new_account.data = 1;
        Ok(())
    }

    pub fn double(ctx: Context<Double>) -> Result<()> {
        let account = &mut ctx.accounts.account;
        account.data *= 2;
        Ok(())
    }

    pub fn halve(ctx: Context<Halves>) -> Result<()> {
        let account = &mut ctx.accounts.account;
        account.data = account.data / 2;
        Ok(())
    }

    pub fn add(ctx: Context<Add>, amount: u32) -> Result<()> {
        let account = &mut ctx.accounts.account;
        account.data = account.data + amount;
        Ok(())
    }

    pub fn sub(ctx: Context<Sub>, amount: u32) -> Result<()> {
        let account = &mut ctx.accounts.account;
        account.data = account.data - amount;
        Ok(())
    }
}

#[account]
pub struct NewAccount {
    data: u32,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8 + 4)]
    pub new_account: Account<'info, NewAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Double<'info> {
    #[account(mut)]
    pub account: Account<'info, NewAccount>,
    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Halves<'info> {
    #[account(mut)]
    pub account: Account<'info, NewAccount>,
    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Add<'info> {
    #[account(mut)]
    pub account: Account<'info, NewAccount>,
    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Sub<'info> {
    #[account(mut)]
    pub account: Account<'info, NewAccount>,
    pub signer: Signer<'info>,
}
