export interface Sesion {
    tokenPayload: string;
    createAt: Date;
    refreshAt: Date;
    expiresAt: Date;
}

export interface SesionState {
    loading: boolean;
    data: Sesion | null;
}
