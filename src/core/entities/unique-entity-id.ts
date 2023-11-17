import { randomInt } from 'crypto';

export class UniqueEntityId {
  private _value: bigint | number;

  private constructor(value?: bigint) {
    this._value = value ?? randomInt(999999999999);
  }

  get value(): bigint | number {
    return this._value;
  }

  equals(id: UniqueEntityId): boolean {
    return id.toString() === this.toString();
  }

  static createFromInt(value: bigint) {
    return new UniqueEntityId(value);
  }

  static create() {
    return new UniqueEntityId();
  }
}
