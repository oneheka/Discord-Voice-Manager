import type { CreateUserSettingInput, UserSetting } from "@/db/users/UserSchema";
import type { CreateActiveRoomInput, ActiveRoom } from "@/db/rooms/RoomSchema";
import type { CreateCreatorInput, Creator } from "@/db/creators/CreatorSchema";
import { userSettings } from "@/db/users/UserSchema";
import { activeRooms } from "@/db/rooms/RoomSchema";
import { creators } from "@/db/creators/CreatorSchema";

export const schema = {
    creators,
    activeRooms,
    userSettings
}

export type DBSchema = typeof schema
export { creators, activeRooms, userSettings }
export type { Creator, CreateCreatorInput, ActiveRoom, CreateActiveRoomInput, UserSetting, CreateUserSettingInput }