import _ from 'lodash'
const sTask = {
    namespaced: true,
    state: () => ({
        problems: [],
        studentAnswers: new Map(),
        answersFinished: new Map(),
        currentProblem: '',

    }),
    mutations: {
        /**
         * @param {object} 传入一个对象 state里面的属性值和 值
         */
        init(state, param) {
            if (typeof param.value === 'object') {
                state[param.key] = _.cloneDeep(param.value)
            }
            state[param.key] = _.cloneDeep(param.value)
        },
        /**
         * @param {object} 传入一个对象 包括题目id和作答答案
         */
        setStudentAnswer(state, param) {
            state.studentAnswers.set(param.question_id, param.value)
        },

        /**
         * @param {object} 传入一个对象 包括题目id和作答状态
         */
        setAnswersFinished(state, param) {
            state.answersFinished.set(param.question_id, param.value)
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