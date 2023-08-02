export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chat: {
        Row: {
          color: string | null
          id: string
          msg: string
        }
        Insert: {
          color?: string | null
          id?: string
          msg: string
        }
        Update: {
          color?: string | null
          id?: string
          msg?: string
        }
        Relationships: []
      }
      second_chat: {
        Row: {
          answer: string | null
          answered: boolean | null
          id: string
          msg: string
          role: string
        }
        Insert: {
          answer?: string | null
          answered?: boolean | null
          id?: string
          msg: string
          role: string
        }
        Update: {
          answer?: string | null
          answered?: boolean | null
          id?: string
          msg?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
