export interface UserDto {
  id: number;
  direct_boss: number;
  username: string;
  email: string;
  email_verified_at: boolean | null;
  access_level: number;
  user_status: number;
  created_at: string;
  updated_at: string;
  details: {
    first_name: string | null;
    last_name: string | null;
    phone_number: string | null;
    birthday: string | null;
    national_id: string | null;
    email: string;
    notes: string | null;
    face: string | null;
    passport_1: string | null;
    passport_2: string | null;
    created_at: string;
    updated_at: string;
  };
}
