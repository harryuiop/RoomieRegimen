import bcrypt from 'bcryptjs';

export async function hash(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salt);
}

export async function compare(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}
