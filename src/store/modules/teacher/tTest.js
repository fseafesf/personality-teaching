const tTest = {
  namespaced:true,
  state: () => ({
    name: 'test',
    problems:[
      {id:1,content:'这是第一道题目',type:2},
      {id:2,content:'这是第二道题目',type:1},
      {id:3,content:'这是第三道题目',type:3},
      {id:4,content:'这是第四道题目',type:4},
      {id:5,content:'这是第五道题目',type:5},
      {id:6,content:'这是第六道题目',type:4},
      {id:7,content:'这是第七道题目',type:1},
      {id:8,content:'这是第八道题目',type:2},
      {id:9,content:'这是第九道题目',type:3},
    ],
    selectProblem:[]

  }),
  mutations: {
    addProblem(state,problem){
      state.selectProblem.push(problem)
    },
    deleteProblem(state,index){
      state.selectProblem.splice(index,1)
    },
    deleteProblemType(state,type){
      
    }
  },
  actions: {

  },
  getters: {

  }
}

export default tTest