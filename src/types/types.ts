export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
	public: {
		Tables: {
			chat: {
				Row: {
					chatmessage: string
					created_at: string
					room: number
					userid: number
				}
				Insert: {
					chatmessage: string
					created_at?: string
					room: number
					userid?: number
				}
				Update: {
					chatmessage?: string
					created_at?: string
					room?: number
					userid?: number
				}
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
