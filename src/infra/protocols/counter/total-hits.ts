import { TotalHits } from '../../../data/protocols/counter';

export class TotalHitsAdapter implements TotalHits {
  private readonly COUNTER_API_BASE_URL = 'https://api.countapi.xyz';

  async execute(): Promise<number> {
    const response = await fetch(
      `${this.COUNTER_API_BASE_URL}/hit/${process.env.COUNTER_API_YOUR_SITE}}/visits`,
    );

    const totalHits = await response.json();
    return totalHits.value;
  }
}
