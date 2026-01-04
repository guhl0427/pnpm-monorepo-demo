export interface GameItem {
  id: string
  type: 'image' | 'text'
  content: string
  isDifferent: boolean
  label?: string
}

export interface Level {
  id: number
  title: string
  description: string
  items: GameItem[]
}

// Generators

function generateMathEquationLevels(count: number, startId: number): Level[] {
  const levels: Level[] = []
  for (let i = 0; i < count; i++) {
    // Generate 3 correct, 1 incorrect
    const items: GameItem[] = []
    
    const generateEquation = (correct: boolean) => {
      const a = Math.floor(Math.random() * 10) + 1
      const b = Math.floor(Math.random() * 10) + 1
      const op = Math.random() > 0.5 ? '+' : '-'
      let res = op === '+' ? a + b : a - b
      if (!correct) {
        res += (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1)
      }
      return `${a} ${op} ${b} = ${res}`
    }

    // 3 Correct, 1 Wrong
    for (let j = 0; j < 3; j++) {
      items.push({ id: `m${startId + i}_${j}`, type: 'text', content: generateEquation(true), isDifferent: false })
    }
    items.push({ id: `m${startId + i}_diff`, type: 'text', content: generateEquation(false), isDifferent: true })

    levels.push({
      id: startId + i,
      title: `关卡 ${startId + i}`,
      description: '请找出不同的一项 (结果错误的那一个)',
      items: items.sort(() => Math.random() - 0.5)
    })
  }
  return levels
}

function generateMathParityLevels(count: number, startId: number): Level[] {
  const levels: Level[] = []
  for (let i = 0; i < count; i++) {
    const targetEven = Math.random() > 0.5 // If distinct is Even, then others are Odd
    
    const items: GameItem[] = []
    
    const generateNum = (even: boolean) => {
      let n = Math.floor(Math.random() * 20) + 1
      if (even && n % 2 !== 0) n++
      if (!even && n % 2 === 0) n++
      return n.toString()
    }

    // 3 Common, 1 Distinct
    for (let j = 0; j < 3; j++) {
      items.push({ id: `p${startId + i}_${j}`, type: 'text', content: generateNum(!targetEven), isDifferent: false })
    }
    items.push({ id: `p${startId + i}_diff`, type: 'text', content: generateNum(targetEven), isDifferent: true })

    levels.push({
      id: startId + i,
      title: `关卡 ${startId + i}`,
      description: '请找出不同的一项 (奇数或偶数)',
      items: items.sort(() => Math.random() - 0.5)
    })
  }
  return levels
}

function generateCategoryLevels(count: number, startId: number): Level[] {
  const templates = [
    { common: ['苹果', '香蕉', '橘子', '葡萄', '梨'], diff: ['汽车', '椅子', '桌子', '电脑'] },
    { common: ['红色', '蓝色', '绿色', '黄色', '紫色'], diff: ['香蕉', '苹果', '猫', '狗'] },
    { common: ['猫', '狗', '兔子', '仓鼠'], diff: ['桌子', '杯子', '花', '树'] },
    { common: ['桌子', '椅子', '柜子', '床'], diff: ['猫', '狗', '苹果', '红色'] },
    { common: ['1', '2', '3', '4', '5'], diff: ['A', 'B', 'C', 'D'] } // Number vs Letter
  ]

  const levels: Level[] = []
  for (let i = 0; i < count; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)]!
    const items: GameItem[] = []
    
    // Pick 3 common
    const shuffledCommon = [...template.common].sort(() => Math.random() - 0.5)
    for (let j = 0; j < 3; j++) {
      items.push({ id: `c${startId + i}_${j}`, type: 'text', content: shuffledCommon[j]!, isDifferent: false })
    }
    // Pick 1 diff
    const diffItem = template.diff[Math.floor(Math.random() * template.diff.length)]
    items.push({ id: `c${startId + i}_diff`, type: 'text', content: diffItem!, isDifferent: true })

    levels.push({
      id: startId + i,
      title: `关卡 ${startId + i}`,
      description: '请找出不同的一项 (类别不同)',
      items: items.sort(() => Math.random() - 0.5)
    })
  }
  return levels
}

function generateArrowLevels(count: number, startId: number): Level[] {
  const levels: Level[] = []
  const cardinal = ['⬆️', '⬇️', '⬅️', '➡️']
  const diagonal = ['↗️', '↘️', '↙️', '↖️']
  
  for (let i = 0; i < count; i++) {
    const isTargetCardinal = Math.random() > 0.5
    const targetSet = isTargetCardinal ? cardinal : diagonal
    const otherSet = isTargetCardinal ? diagonal : cardinal

    const items: GameItem[] = []
    
    // Pick 3 UNIQUE items from otherSet (Common property)
    const shuffledOther = [...otherSet].sort(() => Math.random() - 0.5)
    for (let j = 0; j < 3; j++) {
      items.push({ id: `a${startId + i}_${j}`, type: 'text', content: shuffledOther[j]!, isDifferent: false })
    }
    
    // Pick 1 from targetSet
    const diffItem = targetSet[Math.floor(Math.random() * targetSet.length)]
    items.push({ id: `a${startId + i}_diff`, type: 'text', content: diffItem!, isDifferent: true })

    levels.push({
      id: startId + i,
      title: `关卡 ${startId + i}`,
      description: isTargetCardinal ? '请找出正向的箭头' : '请找出斜向的箭头',
      items: items.sort(() => Math.random() - 0.5)
    })
  }
  return levels
}

function generateShapeLevels(count: number, startId: number): Level[] {
  const levels: Level[] = []
  
  // Straight edged (Polygons)
  const straight = ['🟦', '🔺', '⬛', '🔶', '⭐', '💠']
  // Curved / Round
  const curved = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '💿', '🌑']

  for (let i = 0; i < count; i++) {
    const isTargetStraight = Math.random() > 0.5
    const targetSet = isTargetStraight ? straight : curved
    const otherSet = isTargetStraight ? curved : straight

    const items: GameItem[] = []
    
    // Pick 3 from otherSet
    const shuffledOther = [...otherSet].sort(() => Math.random() - 0.5)
    for (let j = 0; j < 3; j++) {
      // Use modulo to cycle if run out of unique shapes (though we have enough)
      const content = shuffledOther[j % shuffledOther.length]!
      items.push({ id: `s${startId + i}_${j}`, type: 'text', content: content, isDifferent: false })
    }
    
    const diffItem = targetSet[Math.floor(Math.random() * targetSet.length)]
    items.push({ id: `s${startId + i}_diff`, type: 'text', content: diffItem!, isDifferent: true })

    levels.push({
      id: startId + i,
      title: `关卡 ${startId + i}`,
      description: isTargetStraight ? '请找出有棱角的图形' : '请找出圆形的图形',
      items: items.sort(() => Math.random() - 0.5)
    })
  }
  return levels
}

function generateClockLevels(count: number, startId: number): Level[] {
  const levels: Level[] = []
  // Clocks on hour vs half hour
  const fullHours = ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛']
  const halfHours = ['🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧']
  
  for (let i = 0; i < count; i++) {
    const isTargetFull = Math.random() > 0.5
    const targetSet = isTargetFull ? fullHours : halfHours
    const otherSet = isTargetFull ? halfHours : fullHours

    const items: GameItem[] = []
    
    // 3 from otherSet (Common), 1 from targetSet (Different)
    for (let j = 0; j < 3; j++) {
      const icon = otherSet[Math.floor(Math.random() * otherSet.length)]
      items.push({ id: `clk${startId + i}_${j}`, type: 'text', content: icon!, isDifferent: false })
    }
    const diffIcon = targetSet[Math.floor(Math.random() * targetSet.length)]
    items.push({ id: `clk${startId + i}_diff`, type: 'text', content: diffIcon!, isDifferent: true })

    levels.push({
      id: startId + i,
      title: `关卡 ${startId + i}`,
      description: isTargetFull ? '请找出整点的时间 (例如 3:00)' : '请找出半点的时间 (例如 3:30)',
      items: items.sort(() => Math.random() - 0.5)
    })
  }
  return levels
}

export function generateLevels(): Level[] {
  let id = 1
  const levels = [
    ...generateMathEquationLevels(20, id),
    ...generateMathParityLevels(20, id + 20),
    ...generateCategoryLevels(20, id + 40),
    ...generateArrowLevels(20, id + 60),
    ...generateShapeLevels(20, id + 80),
    ...generateClockLevels(20, id + 100)
  ]
  
  return levels.sort(() => Math.random() - 0.5).map((l, idx) => ({ ...l, id: idx + 1, title: `关卡 ${idx + 1}` }))
}

export const defaultLevels: Level[] = generateLevels()
