var keyMirror = require('react/lib/keyMirror');

var APIRoot = "/api";

module.exports = {
    API: {
        GET_PAPER_INDEX: APIRoot + '/getPaperIndex',
        GET_PAPERS: APIRoot + '/getPapers',
        ADMIN_GET_PAPERS: APIRoot + '/adminGetPapers',
        ADMIN_POST_PAPER: APIRoot + '/adminPostPaper',
        ADMIN_DELETE_PAPER: APIRoot + '/adminDeletePaper'
    },

    URL: 'http://seokma.com',

    PaperActionType: keyMirror({
        REQUEST_PAPER_INDEX: null,
        RECEIVE_PAPER_INDEX: null,
        REQUEST_PAPERS: null,
        RECEIVE_PAPERS: null,
        SET_FILTERS_AND_ORDER: null
    }),


    PaperType: keyMirror({
        ABOUT: null,
        POST: null,
        PRODUCT: null,
        PROJECT: null,
        APP: null
    }),

    RESPONSE_SIZE: {
        ONE_BY_TWO: 640,
        TWO_BY_THREE: 960,
        THREE_BY_FOUR: 1280,
        FOUR_BY_FIVE: 1600
    },

    DEVICE: keyMirror({
        ONE: null,
        TWO: null,
        THREE: null,
        FOUR: null,
        FIVE: null
    }),

    CurrentPage: keyMirror({
        INDEX: null,
        TAG: null,
        POST: null,
        PRODUCT: null,
        PROJECT: null,
        APP: null,
        ADMIN: null
    }),

    OrderType: keyMirror({
        ORDER_BY_AUTO: null,
        ORDER_BY_NEWEST: null,
        ORDER_BY_OLDEST: null,
        ORDER_BY_NAME: null
    })
};