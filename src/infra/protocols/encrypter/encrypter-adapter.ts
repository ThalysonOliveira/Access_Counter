import { hashSync } from 'bcrypt';
import { Encrypt } from '../../../data/protocols/encrypter';

class EncryptAdapter implements Encrypt {
  constructor(private readonly salt: number) {}

  execute(value: string): string {
    return hashSync(value, this.salt);
  }
}

export { EncryptAdapter };
