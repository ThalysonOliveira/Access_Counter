import { Increment } from '../../../data/protocols/counter';

export class IncrementAdapter implements Increment {
  private readonly COUNTER_API_BASE_URL = 'https://api.countapi.xyz';
  private readonly STRING_URL_PARAMS = `${process.env.COUNTER_API_YOUR_SITE}/${process.env.COUNTER_API_YOUR_SITE_KEY}`;

  async execute(): Promise<void> {
    await fetch(
      `${this.COUNTER_API_BASE_URL}/update/${this.STRING_URL_PARAMS}/?amount=1`,
    );
  }
}
