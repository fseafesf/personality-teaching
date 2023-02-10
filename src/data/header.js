// 教师Header
export const tHeaderData = [
  {
    name: '首页',
    path: '/home'
  },
  {
    name: '知识点管理',
    path: '/teacher/knowledge',
    children: [
      {
        name: '知识点树',
        path: '/teacher/knowledge/tree'
      },
      {
        name: '知识点联系',
        path: '/teacher/knowledge/contact'
      },
      {
        // name: '添加知识点',
        path: '/teacher/knowledge/add'
      },
      {
        // name: '编辑知识点',
        path: '/teacher/knowledge/edit'
      }
    ]
  },
  {
    name: '题目管理',
    path: '/teacher/topic',
    children: [
      {
        name: '添加题目',
        path: '/teacher/topic/add'
      },
      {
        name: '编辑题目',
        path: '/teacher/topic/edit'
      }
    ]
  },
  {
    name: '班级管理',
    path: '/teacher/class',
    children: [
      {
        name: '班级信息',
        path: '/teacher/class/classInfo'
      }
    ]
  },
  {
    name: '试卷管理',
    path: '/teacher/examHome',
    children: [
      {
        name: '试卷列表',
        path: '/teacher/examHome/examPaper'
      },
      {
        name: '新增试卷',
        path: '/teacher/examHome/test'
      },
      {
        name: '预览试卷',
        path: '/teacher/examHome/preview'
      },
      {
        name: '发布试卷',
        path: '/teacher/examHome/release'
      }
    ]
  },
  {
    name: '试卷评阅',
    path: '/teacher/reviewHome',
    children: [
      {
        name: '试卷发布列表',
        path: '/teacher/reviewHome/review'
      },
      {
        name: '班级列表',
        path: '/teacher/reviewHome/correctClass'
      },
      {
        name: '学生列表',
        path: '/teacher/reviewHome/correctStudent'
      },
      {
        name: '评阅页面',
        path: '/teacher/reviewHome/correctReview'
      }
    ]
  },
  {
    name: '学情分析',
    path: '/teacher/analysis',
    children: [
      {
        name: '查看班级情况',
        path: '/teacher/analysis/classAnalysis'
      },
      {
        name: '查看个人情况',
        path: '/teacher/analysis/studentAnalysis'
      }
    ]
  }
]

// 学生Header
export const sHeaderData = [
  {
    name: '个人中心',
    path: '/student/mine',
    children: [
      {
        name: '学生班级',
        path: '/student/class'
      },
      {
        name: '学生作业',
        path: '/student/task'
      },
      {
        name: '作业答案',
        path: '/student/answer'
      }
    ]
  },
  {
    name: '学情分析',
    path: '/student/analysis'
  }
]
