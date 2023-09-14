export class LoginResponseDto {
  readonly statusCode: number;
  readonly response: {
    readonly token: string;
    readonly user: {
      _id: string;
      email: string;
      firstname: string;
      lastname: string;
      phone: string;
      verified: boolean;
      is_active: boolean;
      role: string;
      current_subscription: any;
      image: string;
    };
  };
  readonly message: string;
}
