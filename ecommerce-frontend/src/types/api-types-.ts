export interface SignupResponse{
    success : boolean;
    message : string;
}

export interface LoginResponse{
    success : string;
    message : string;
    token : string;
}