export interface SearchResponse {
    hits: SearchResult[],
    query: any,
    duration: any,
    elasticQuery: any,
    hitCount: any
}

export interface SearchResult {
    score?: number,
    pk_id?: number,
    e_type?: string,
    org?: string,
    sport_id?: number,
    s_text?: string,
    g_year?: number,
    city?: string,
    state?: string,
    ph?: {
        M?: string,
        H?: string,
        C?: string,
        W?: string
    },
    email?: string,
    email_2?: string,
    twit?: string,
    u_id?: string,
    ncaa_e_num?: string,
    shown?: boolean,
    url?: string,
    sub_text?: string
}