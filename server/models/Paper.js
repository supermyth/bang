var Paper = {
    title: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    data: {}
};

module.exports = Paper;