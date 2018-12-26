export default {
    1: `
        CREATE TABLE "api-calls" (
            "id" TEXT PRIMARY KEY NOT NULL,
            "call" json NOT NULL
        );
    `,
    2: `
        CREATE TABLE "devices" (
            "id" TEXT PRIMARY KEY NOT NULL,
            "ip" TEXT NOT NULL,
            "type" TEXT NOT NULL,
            "browser" TEXT NOT NULL,
            "browserVersion" TEXT NOT NULL,
            "os" TEXT NOT NULL,
            "osVersion" TEXT NOT NULL,
            "screen_height" INTEGER NOT NULL,
            "screen_width" INTEGER NOT NULL,
            "version" TEXT NOT NULL,
            "userId" TEXT NOT NULL,
            "language" TEXT NOT NULL,
            "lastActiveAt" DATE NOT NULL
    );
    `,
    3: `
        CREATE TABLE "TB_AUDIO"(
            "id" TEXT PRIMARY KEY NOT NULL,
            "userId" TEXT NOT NULL,
            "audioUrl" TEXT NOT NULL,
            "createdAt" DATE NOT NULL,
            "updatedAt" DATE NOT NULL,
            "createdBy" TEXT NOT NULL,
            "updatedBy" TEXT NOT NULL,
        );
    `,
    4: `
        CREATE TABLE "TB_INFO"(
            "id" TEXT PRIMARY KEY NOT NULL,
            "username" TEXT NOT NULL,
            "location" TEXT NOT NULL,
            "phoneNumber" TEXT NOT NULL,
            "createdAt" DATE NOT NULL,
            "inputText1" TEXT NOT NULL,
            "inputText2" TEXT NOT NULL,
            
        )
    `,
}