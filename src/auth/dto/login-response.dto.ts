export class LoginResponseDto {
  readonly statusCode: number;
  readonly response: {
    readonly token: string;
    readonly user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      role: string;
    };
  };
  readonly message: string;
}
