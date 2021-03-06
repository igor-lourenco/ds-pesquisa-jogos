
export type RecordsResponse = { //Campos da lista
    content : RecordItem[];
    totalPages : number;
}

export type RecordItem = {
    id : number,
    moment : string,
    name : string,
    age : string,
    gameTitle : string,
    gamePlatform : Platform,
    genreName : string
}

export type Platform = 'XBOX' | 'PC' | 'PLAYSTATION';