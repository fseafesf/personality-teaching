import _ from 'lodash'
import { getExamList } from '@/services'
const sTask = {
    namespaced: true,
    state: () => ({
        examList: [],
        problems: [],
        studentAnswers: new Map(),
        answersFinished: new Map(),
        currentProblem: ''
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
        // 存储学生答案
        setStudentAnswer(state, param) {
            // console.log('执行第一次了');
            state.studentAnswers.set(param.question_id, param.value)
            // console.log(param.value);
            // console.log(state.studentAnswers);
        },

        /**
         * @param {object} 传入一个对象 包括题目id和作答状态
         */
        // 存储学生已作答题目
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
        }
    },
    actions: {
        getInitExamList({ commit }, payload) {
            return new Promise((reslove, reject) => {
                getExamList(payload).then((res) => {
                    console.log(res)
                    commit('init', {
                        key: 'examList',
                        value: res.data
                    })
                    reslove('success')
                }).catch(err => reject(err))
            })
        }
    },
    getters: {}
}

export default sTask
