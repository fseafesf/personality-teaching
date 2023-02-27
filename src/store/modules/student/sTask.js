const sTask = {
    namespaced: true,
    state: () => ({
        studentAnswers: new Map(),
        currentProblem: ''
    }),
    mutations: {
        /**
         * @param {object} 传入一个对象 包括题目id和作答答案
         */
        setStudentAnswer(state, param) {
            state.studentAnswers.set(param.question_id, param.value)
        },

        // 清空map
        clearStudentAnswer(state) {
            state.studentAnswers.clear()
        },

        // 改变当前做的题目
        changeCurrentProblem(state, value) {
            state.currentProblem = value
        },
    },
    actions: {

    },
    getters: {

    }
}

export default sTask