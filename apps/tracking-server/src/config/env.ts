import process from "process";

export const env = {
    PORT: Number(process.env.PORT || 4000)
};