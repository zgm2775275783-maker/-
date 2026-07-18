const TYPES = {
  tuna: { name: "三文鱼", asset: "sushi-salmon.webp" },
  salmon: { name: "海胆", asset: "sushi-uni.webp" },
  uni: { name: "鳗鱼寿司", asset: "sushi-eel.webp" },
  shrimp: { name: "甜虾寿司", asset: "sushi-sweet-shrimp.webp" },
  eel: { name: "虎虾寿司", asset: "sushi-tiger-shrimp.webp" },
  tamago: { name: "牛油果寿司", asset: "sushi-avocado.webp" },
  ikura: { name: "小肌鱼寿司", asset: "sushi-kohada.webp" },
  scallop: { name: "蟹柳寿司", asset: "sushi-crab-stick.webp" }
};

const ORIGINAL_LEVELS = [
  {
    name: "试营业",
    types: ["tuna"],
    tools: { undo: 1, rotate: 1 },
    orders: [{ pattern: ["tuna"], orientation: "h", count: 3 }]
  },
  {
    name: "双拼练习",
    types: ["tuna", "salmon"],
    tools: { undo: 1, rotate: 1 },
    orders: [{ pattern: ["tuna", "salmon"], orientation: "h", count: 3 }]
  },
  {
    name: "三味配平",
    types: ["tuna", "salmon", "uni"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "salmon"], orientation: "h", count: 2 },
      { pattern: ["tuna"], orientation: "h", count: 1 },
      { pattern: ["salmon"], orientation: "h", count: 1 },
      { pattern: ["uni"], orientation: "h", count: 3 }
    ]
  },
  {
    name: "四味搭桥",
    types: ["tuna", "salmon", "uni", "shrimp"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "salmon"], orientation: "h", count: 2 },
      { pattern: ["uni", "shrimp"], orientation: "h", count: 2 },
      { pattern: ["tuna", "uni"], orientation: "v", count: 1 },
      { pattern: ["salmon", "shrimp"], orientation: "v", count: 1 }
    ]
  },
  {
    name: "五味交错",
    types: ["tuna", "salmon", "uni", "shrimp", "eel"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "salmon", "uni"], orientation: "h", count: 2 },
      { pattern: ["shrimp", "eel"], orientation: "h", count: 2 },
      { pattern: ["tuna", "shrimp"], orientation: "v", count: 1 },
      { pattern: ["salmon", "eel"], orientation: "v", count: 1 },
      { pattern: ["uni"], orientation: "h", count: 1 }
    ]
  },
  {
    name: "六味桥阵",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "salmon", "uni"], orientation: "h", count: 2 },
      { pattern: ["shrimp", "eel", "tamago"], orientation: "h", count: 2 },
      { pattern: ["tuna", "shrimp"], orientation: "v", count: 1 },
      { pattern: ["salmon", "eel"], orientation: "v", count: 1 },
      { pattern: ["uni", "tamago"], orientation: "v", count: 1 }
    ]
  },
  {
    name: "主厨排单",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago", "ikura"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "h", count: 2 },
      { pattern: ["eel", "tamago", "ikura"], orientation: "h", count: 2 },
      { pattern: ["tuna", "eel"], orientation: "v", count: 1 },
      { pattern: ["salmon", "tamago"], orientation: "v", count: 1 },
      { pattern: ["uni", "ikura"], orientation: "v", count: 1 },
      { pattern: ["shrimp"], orientation: "h", count: 1 }
    ]
  },
  {
    name: "满席终局",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago", "ikura", "scallop"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "h", count: 2 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "h", count: 2 },
      { pattern: ["tuna", "eel"], orientation: "v", count: 1 },
      { pattern: ["salmon", "tamago"], orientation: "v", count: 1 },
      { pattern: ["uni", "ikura"], orientation: "v", count: 1 },
      { pattern: ["shrimp", "scallop"], orientation: "v", count: 1 }
    ]
  },
  {
    name: "回转双线",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago", "ikura", "scallop"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "h", count: 1 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "h", count: 1 },
      { pattern: ["tuna", "eel"], orientation: "v", count: 1 },
      { pattern: ["salmon", "tamago"], orientation: "v", count: 1 },
      { pattern: ["uni", "ikura"], orientation: "v", count: 1 },
      { pattern: ["shrimp", "scallop"], orientation: "v", count: 1 },
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "v", count: 1 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "v", count: 1 }
    ]
  },
  {
    name: "错位三拼",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago", "ikura", "scallop"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "uni", "eel"], orientation: "h", count: 2 },
      { pattern: ["salmon", "shrimp", "tamago"], orientation: "v", count: 2 },
      { pattern: ["ikura", "scallop"], orientation: "h", count: 2 },
      { pattern: ["tuna", "salmon", "ikura"], orientation: "v", count: 1 },
      { pattern: ["uni", "shrimp", "scallop"], orientation: "h", count: 1 },
      { pattern: ["eel", "tamago"], orientation: "v", count: 1 }
    ]
  },
  {
    name: "单点补位",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago", "ikura", "scallop"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "h", count: 2 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "v", count: 2 },
      { pattern: ["tuna", "eel"], orientation: "h", count: 1 },
      { pattern: ["tuna", "tamago"], orientation: "v", count: 1 },
      { pattern: ["tuna", "ikura", "scallop"], orientation: "h", count: 1 },
      { pattern: ["salmon", "uni", "shrimp"], orientation: "v", count: 1 },
      { pattern: ["tuna"], orientation: "h", count: 1 }
    ]
  },
  {
    name: "双主料压盘",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago", "ikura", "scallop"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "uni", "eel"], orientation: "h", count: 2 },
      { pattern: ["salmon", "shrimp", "tamago"], orientation: "v", count: 2 },
      { pattern: ["ikura", "scallop"], orientation: "h", count: 2 },
      { pattern: ["tuna", "salmon", "ikura"], orientation: "v", count: 1 },
      { pattern: ["uni", "shrimp", "scallop"], orientation: "h", count: 1 },
      { pattern: ["eel", "tamago"], orientation: "v", count: 1 },
      { pattern: ["tuna", "salmon"], orientation: "h", count: 3 }
    ]
  },
  {
    name: "中段夹击",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago", "ikura", "scallop"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "h", count: 1 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "h", count: 1 },
      { pattern: ["tuna", "eel"], orientation: "v", count: 1 },
      { pattern: ["salmon", "tamago"], orientation: "v", count: 1 },
      { pattern: ["uni", "ikura"], orientation: "v", count: 1 },
      { pattern: ["shrimp", "scallop"], orientation: "v", count: 1 },
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "v", count: 1 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "v", count: 1 },
      { pattern: ["uni", "shrimp"], orientation: "v", count: 3 }
    ]
  },
  {
    name: "三料加压",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago", "ikura", "scallop"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "h", count: 1 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "h", count: 1 },
      { pattern: ["tuna", "eel"], orientation: "v", count: 1 },
      { pattern: ["salmon", "tamago"], orientation: "v", count: 1 },
      { pattern: ["uni", "ikura"], orientation: "v", count: 1 },
      { pattern: ["shrimp", "scallop"], orientation: "v", count: 1 },
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "v", count: 1 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "v", count: 1 },
      { pattern: ["tuna", "salmon", "uni"], orientation: "h", count: 3 }
    ]
  },
  {
    name: "深盘折返",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago", "ikura", "scallop"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "uni", "eel"], orientation: "h", count: 2 },
      { pattern: ["salmon", "shrimp", "tamago"], orientation: "v", count: 2 },
      { pattern: ["ikura", "scallop"], orientation: "h", count: 2 },
      { pattern: ["tuna", "salmon", "ikura"], orientation: "v", count: 1 },
      { pattern: ["uni", "shrimp", "scallop"], orientation: "h", count: 1 },
      { pattern: ["eel", "tamago"], orientation: "v", count: 1 },
      { pattern: ["shrimp", "eel", "tamago"], orientation: "v", count: 3 }
    ]
  },
  {
    name: "半盘满载",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago", "ikura", "scallop"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "h", count: 1 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "h", count: 1 },
      { pattern: ["tuna", "eel"], orientation: "v", count: 1 },
      { pattern: ["salmon", "tamago"], orientation: "v", count: 1 },
      { pattern: ["uni", "ikura"], orientation: "v", count: 1 },
      { pattern: ["shrimp", "scallop"], orientation: "v", count: 1 },
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "v", count: 1 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "v", count: 1 },
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "h", count: 3 }
    ]
  },
  {
    name: "后厨满单",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago", "ikura", "scallop"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "uni", "eel"], orientation: "h", count: 2 },
      { pattern: ["salmon", "shrimp", "tamago"], orientation: "v", count: 2 },
      { pattern: ["ikura", "scallop"], orientation: "h", count: 2 },
      { pattern: ["tuna", "salmon", "ikura"], orientation: "v", count: 1 },
      { pattern: ["uni", "shrimp", "scallop"], orientation: "h", count: 1 },
      { pattern: ["eel", "tamago"], orientation: "v", count: 1 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "h", count: 3 }
    ]
  },
  {
    name: "四色锁盘",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago", "ikura", "scallop"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "h", count: 1 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "h", count: 1 },
      { pattern: ["tuna", "eel"], orientation: "v", count: 1 },
      { pattern: ["salmon", "tamago"], orientation: "v", count: 1 },
      { pattern: ["uni", "ikura"], orientation: "v", count: 1 },
      { pattern: ["shrimp", "scallop"], orientation: "v", count: 1 },
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "v", count: 1 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "v", count: 1 },
      { pattern: ["tuna", "uni", "eel", "ikura"], orientation: "h", count: 3 }
    ]
  },
  {
    name: "交叉锁盘",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago", "ikura", "scallop"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "uni", "eel"], orientation: "h", count: 2 },
      { pattern: ["salmon", "shrimp", "tamago"], orientation: "v", count: 2 },
      { pattern: ["ikura", "scallop"], orientation: "h", count: 2 },
      { pattern: ["tuna", "salmon", "ikura"], orientation: "v", count: 1 },
      { pattern: ["uni", "shrimp", "scallop"], orientation: "h", count: 1 },
      { pattern: ["eel", "tamago"], orientation: "v", count: 1 },
      { pattern: ["salmon", "shrimp", "tamago", "scallop"], orientation: "v", count: 3 }
    ]
  },
  {
    name: "极限满席",
    types: ["tuna", "salmon", "uni", "shrimp", "eel", "tamago", "ikura", "scallop"],
    tools: { undo: 1, rotate: 1 },
    orders: [
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "h", count: 1 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "h", count: 1 },
      { pattern: ["tuna", "eel"], orientation: "v", count: 1 },
      { pattern: ["salmon", "tamago"], orientation: "v", count: 1 },
      { pattern: ["uni", "ikura"], orientation: "v", count: 1 },
      { pattern: ["shrimp", "scallop"], orientation: "v", count: 1 },
      { pattern: ["tuna", "salmon", "uni", "shrimp"], orientation: "v", count: 1 },
      { pattern: ["eel", "tamago", "ikura", "scallop"], orientation: "v", count: 1 },
      { pattern: ["tuna", "shrimp", "tamago", "scallop"], orientation: "h", count: 3 }
    ]
  }
];

const SUSHI_KEYS = Object.keys(TYPES);
const CUT_VARIANTS = {
  2: [
    [[1, 1], [2], [1, 1]],
    [[2], [1, 1], [1, 1]],
    [[1, 1], [1, 1], [2]]
  ],
  3: [
    [[1, 2], [2, 1], [1, 1, 1]],
    [[3], [1, 2], [2, 1]],
    [[1, 1, 1], [3], [1, 2]],
    [[2, 1], [1, 1, 1], [3]]
  ],
  4: [
    [[2, 2], [1, 3], [3, 1]],
    [[1, 1, 2], [2, 1, 1], [4]],
    [[1, 3], [2, 2], [1, 1, 2]],
    [[4], [1, 2, 1], [2, 2]],
    [[2, 1, 1], [3, 1], [1, 3]]
  ],
  5: [
    [[2, 3], [3, 2], [1, 2, 2]],
    [[1, 1, 3], [2, 2, 1], [3, 2]],
    [[4, 1], [1, 3, 1], [2, 1, 2]],
    [[1, 2, 2], [5], [2, 3]],
    [[3, 1, 1], [1, 1, 3], [2, 3]]
  ],
  6: [
    [[3, 3], [2, 2, 2], [1, 2, 3]],
    [[1, 1, 4], [2, 3, 1], [3, 1, 2]],
    [[4, 2], [1, 3, 2], [2, 1, 3]],
    [[2, 2, 2], [6], [1, 1, 4]],
    [[1, 4, 1], [3, 2, 1], [2, 3, 1]]
  ]
};

const COMPACT_CUT_VARIANTS = {
  2: [
    [[2], [1, 1], [2]],
    [[1, 1], [2], [2]],
    [[2], [2], [1, 1]]
  ],
  3: [
    [[3], [1, 2], [3]],
    [[1, 2], [3], [3]],
    [[3], [3], [2, 1]]
  ],
  4: [
    [[4], [2, 2], [1, 3]],
    [[1, 3], [4], [2, 2]],
    [[2, 2], [3, 1], [4]]
  ],
  5: [
    [[5], [2, 3], [1, 4]],
    [[1, 4], [5], [3, 2]],
    [[2, 3], [4, 1], [5]]
  ],
  6: [
    [[6], [3, 3], [2, 4]],
    [[2, 4], [6], [3, 3]],
    [[3, 3], [4, 2], [6]]
  ]
};

const CHALLENGE_LEVEL_NAMES = [
  "四味开局", "双线并桌", "错位上菜", "纵横初阵", "回转加压",
  "回转起步", "纵横分流", "双味折线", "三段拼桌", "左右夹盘", "竖线接力",
  "错位补单", "双向上菜", "四角回转", "长短并桌", "双排暗线", "连环拼盘",
  "五味分席", "反向摆渡", "中轴补位", "横竖交锋", "双线同桌", "长卷拆分",
  "六味回廊", "双柱合流", "错层拼接", "回转迷阵", "七味串联", "交叉接单",
  "双盘换位", "纵横封边", "连桌三段", "满席分流", "八味回转", "双桥并行",
  "深盘补位", "主厨交叉", "两路合席", "逆向长卷", "四线交替", "回转连台",
  "高峰满单", "双阵压轴", "极限拼桌", "主厨试炼", "终宴预演", "全席清盘"
];

function makeSequence(seed, length, typeCount, offset = 0) {
  const sequence = [];
  const steps = [1, 2, 3, 5, 7];
  let step = steps[(seed + offset) % steps.length] % typeCount || 1;
  const greatestCommonDivisor = (left, right) => {
    let a = left;
    let b = right;
    while (b > 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };
  while (greatestCommonDivisor(step, typeCount) !== 1) {
    step = (step + 1) % typeCount || 1;
  }
  for (let index = 0; index < length; index += 1) {
    const typeIndex = (seed * 3 + offset * 2 + index * step) % typeCount;
    sequence.push(SUSHI_KEYS[typeIndex]);
  }
  return sequence;
}

function oppositeOrientation(orientation) {
  return orientation === "h" ? "v" : "h";
}

function buildOrdersFromMotifs(motifs) {
  const orderMap = new Map();
  motifs.forEach((motif) => {
    const flipped = new Set((motif.flips || []).map(([line, segment]) => `${line}:${segment}`));
    motif.cuts.forEach((parts, lineIndex) => {
      let cursor = 0;
      parts.forEach((length, segmentIndex) => {
        const pattern = motif.sequence.slice(cursor, cursor + length);
        cursor += length;
        const shouldFlip = length > 1 && flipped.has(`${lineIndex}:${segmentIndex}`);
        const orientation = shouldFlip ? oppositeOrientation(motif.orientation) : motif.orientation;
        const key = `${orientation}|${pattern.join(",")}`;
        const existing = orderMap.get(key);
        if (existing) {
          existing.count += 1;
        } else {
          orderMap.set(key, { pattern, orientation, count: 1 });
        }
      });
      if (cursor !== motif.sequence.length) {
        throw new Error("关卡切分长度与寿司序列不一致");
      }
    });
  });
  return [...orderMap.values()];
}

function toolsForLevel(levelNumber) {
  if (levelNumber >= 36) {
    return { undo: 1, rotate: 5 };
  }
  if (levelNumber >= 26) {
    return { undo: 1, rotate: 4 };
  }
  if (levelNumber >= 16) {
    return { undo: 1, rotate: 3 };
  }
  if (levelNumber >= 9) {
    return { undo: 1, rotate: 2 };
  }
  return { undo: 1, rotate: 1 };
}

function waveLengthsForLevel(levelNumber) {
  const earlyWaves = {
    4: [4, 2],
    5: [4, 3],
    6: [5, 3],
    7: [5, 4],
    8: [6, 4],
    9: [6, 5],
    10: [6, 6]
  };
  if (earlyWaves[levelNumber]) {
    return earlyWaves[levelNumber];
  }
  if (levelNumber <= 15) {
    return [6, 5, 2];
  }
  if (levelNumber <= 20) {
    return [6, 6, 2];
  }
  if (levelNumber <= 25) {
    return [6, 6, 3];
  }
  if (levelNumber <= 30) {
    return [6, 6, 4];
  }
  if (levelNumber <= 35) {
    return [6, 6, 5];
  }
  return [6, 6, 6];
}

function addRequiredFlips(motifs, count, seed) {
  const seen = new Set();
  const buckets = motifs.map((motif, motifIndex) => {
    const candidates = [];
    motif.cuts.forEach((parts, lineIndex) => {
      let cursor = 0;
      parts.forEach((length, segmentIndex) => {
        const pattern = motif.sequence.slice(cursor, cursor + length);
        cursor += length;
        const key = `${motif.orientation}|${pattern.join(",")}`;
        if (length > 1 && !seen.has(key)) {
          seen.add(key);
          candidates.push({ motifIndex, lineIndex, segmentIndex });
        }
      });
    });
    return candidates;
  });
  const candidates = [];
  const bucketLength = Math.max(0, ...buckets.map((bucket) => bucket.length));
  for (let index = 0; index < bucketLength; index += 1) {
    buckets.forEach((bucket) => {
      if (bucket[index]) {
        candidates.push(bucket[index]);
      }
    });
  }
  if (candidates.length === 0) {
    return;
  }
  const offset = seed % candidates.length;
  const rotated = [...candidates.slice(offset), ...candidates.slice(0, offset)];
  rotated.slice(0, Math.min(count, rotated.length)).forEach((candidate) => {
    motifs[candidate.motifIndex].flips.push([candidate.lineIndex, candidate.segmentIndex]);
  });
}

function buildChallengeLevel(name, challengeIndex) {
  const levelNumber = challengeIndex + 4;
  const typeCount = Math.min(8, 4 + Math.floor((levelNumber - 4) / 4));
  const waveLengths = waveLengthsForLevel(levelNumber);
  const motifs = waveLengths.map((length, motifIndex) => {
    const orientation = (challengeIndex + motifIndex) % 2 === 0 ? "h" : "v";
    const variants = levelNumber >= 11 ? COMPACT_CUT_VARIANTS[length] : CUT_VARIANTS[length];
    return {
      sequence: makeSequence(challengeIndex + 2 + motifIndex * 5, length, typeCount, motifIndex * 3),
      orientation,
      cuts: variants[(challengeIndex + motifIndex * 2) % variants.length],
      flips: []
    };
  });
  if (levelNumber >= 36 && motifs.length === 3) {
    motifs[2].sequence = [...motifs[0].sequence];
    motifs[2].orientation = motifs[0].orientation;
    motifs[2].cuts = motifs[0].cuts.map((parts) => [...parts]);
  }
  addRequiredFlips(motifs, toolsForLevel(levelNumber).rotate, challengeIndex + 3);
  if (levelNumber >= 36 && motifs.length === 3) {
    motifs[2].flips = motifs[0].flips.map((marker) => [...marker]);
  }

  const types = [...new Set(motifs.flatMap((motif) => motif.sequence))];
  return {
    name,
    types,
    tools: toolsForLevel(levelNumber),
    orders: buildOrdersFromMotifs(motifs),
    blueprint: motifs
  };
}

const LEVELS = [
  ...ORIGINAL_LEVELS.slice(0, 3),
  ...CHALLENGE_LEVEL_NAMES.map(buildChallengeLevel)
];

const SIZE = 6;
const CELLS = SIZE * SIZE;
const BEST_KEY = "sushi-eliminate-best";
const UNLOCKED_LEVEL_KEY = "sushi-eliminate-unlocked-level";
const COMPLETED_KEY = "sushi-eliminate-completed";
const SETTINGS_KEY = "sushi-eliminate-settings";
const UI_ASSET_PATH = "./assets/ui/";
const SUSHI_ASSET_PATH = "./assets/sushi/";
const AUDIO_ASSET_PATH = "./assets/audio/";
const SOUND_FILES = {
  select: "select.wav",
  place: "place.wav",
  clear: "clear-new.wav",
  undo: "undo.wav",
  rotate: "rotate.wav",
  restart: "restart.wav",
  invalid: "invalid.wav",
  success: "success-new.wav",
  fail: "fail-new.wav"
};
const SOUND_VOLUME = {
  select: 0.58,
  place: 0.62,
  clear: 0.82,
  undo: 0.72,
  rotate: 0.62,
  restart: 0.62,
  invalid: 0.68,
  success: 0.88,
  fail: 0.84
};
const IMAGE_ASSETS = [
  "./assets/bg/restaurant-bg.jpg",
  `${UI_ASSET_PATH}logo-sushi-mascot.webp`,
  `${UI_ASSET_PATH}icon-level.webp`,
  `${UI_ASSET_PATH}icon-score.webp`,
  `${UI_ASSET_PATH}icon-ranking.webp`,
  `${UI_ASSET_PATH}icon-sound-on.webp`,
  `${UI_ASSET_PATH}icon-sound-off.webp`,
  `${UI_ASSET_PATH}tool-spatula-undo.webp`,
  `${UI_ASSET_PATH}tool-rotate-arrows.webp`,
  `${UI_ASSET_PATH}tool-restart.webp`,
  ...Object.values(TYPES).map((type) => `${SUSHI_ASSET_PATH}${type.asset}`)
];

const elements = {
  loadingScreen: document.getElementById("loadingScreen"),
  homeScreen: document.getElementById("homeScreen"),
  game: document.getElementById("game"),
  loadingBar: document.getElementById("loadingBar"),
  homeProgress: document.getElementById("homeProgress"),
  continueBtn: document.getElementById("continueBtn"),
  startOverBtn: document.getElementById("startOverBtn"),
  helpBtn: document.getElementById("helpBtn"),
  helpModal: document.getElementById("helpModal"),
  helpCloseBtn: document.getElementById("helpCloseBtn"),
  resetModal: document.getElementById("resetModal"),
  cancelResetBtn: document.getElementById("cancelResetBtn"),
  confirmResetBtn: document.getElementById("confirmResetBtn"),
  homeSoundBtn: document.getElementById("homeSoundBtn"),
  board: document.getElementById("board"),
  orders: document.getElementById("orders"),
  tray: document.getElementById("tray"),
  message: document.getElementById("message"),
  levelLabel: document.getElementById("levelLabel"),
  levelName: document.getElementById("levelName"),
  scoreLabel: document.getElementById("scoreLabel"),
  bestLabel: document.getElementById("bestLabel"),
  remainingLabel: document.getElementById("remainingLabel"),
  undoBtn: document.getElementById("undoBtn"),
  rotateBtn: document.getElementById("rotateBtn"),
  restartBtn: document.getElementById("restartBtn"),
  exitBtn: document.getElementById("exitBtn"),
  soundBtn: document.getElementById("soundBtn"),
  companionBtn: document.getElementById("companionBtn"),
  companionBubble: document.getElementById("companionBubble"),
  resultModal: document.getElementById("resultModal"),
  resultCompanion: document.getElementById("resultCompanion"),
  resultTitle: document.getElementById("resultTitle"),
  resultText: document.getElementById("resultText"),
  retryBtn: document.getElementById("retryBtn"),
  nextBtn: document.getElementById("nextBtn"),
  fxLayer: document.getElementById("fxLayer")
};

const state = {
  levelIndex: 0,
  unlockedLevelIndex: readStorageNumber(UNLOCKED_LEVEL_KEY, 0),
  board: Array(CELLS).fill(null),
  remaining: [],
  tools: { undo: 0, rotate: 0 },
  active: null,
  score: 0,
  levelStartScore: 0,
  moves: 0,
  history: [],
  sound: readSettings().sound,
  completed: localStorage.getItem(COMPLETED_KEY) === "true",
  message: "",
  homeNotice: "",
  best: readStorageNumber(BEST_KEY, 0)
};

let audioContext = null;
let audioMaster = null;
let noiseBuffer = null;
let audioPrimed = false;
const audioPools = new Map();
let dragGhost = null;
let dragFrame = 0;
let dragPoint = null;
let previewStartIndex = -1;
let previewCells = [];
let boardCells = [];
let renderedOrdersLevel = -1;
let orderViews = [];
let petTimer = 0;
let petIdleTimer = 0;

function init() {
  elements.continueBtn.addEventListener("click", continueChallenge);
  elements.startOverBtn.addEventListener("click", openResetModal);
  elements.helpBtn.addEventListener("click", openHelpModal);
  elements.helpCloseBtn.addEventListener("click", closeHelpModal);
  elements.cancelResetBtn.addEventListener("click", closeResetModal);
  elements.confirmResetBtn.addEventListener("click", confirmStartOver);
  elements.homeSoundBtn.addEventListener("click", toggleSound);
  elements.undoBtn.addEventListener("click", undoMove);
  elements.rotateBtn.addEventListener("click", rotateActive);
  elements.restartBtn.addEventListener("click", restartCurrentLevel);
  elements.exitBtn.addEventListener("click", exitToHome);
  elements.soundBtn.addEventListener("click", toggleSound);
  elements.tray.addEventListener("pointerdown", startDrag);
  elements.board.addEventListener("click", handleBoardClick);
  elements.companionBtn.addEventListener("click", interactWithCompanion);
  elements.retryBtn.addEventListener("click", restartCurrentLevel);
  elements.nextBtn.addEventListener("click", () => {
    closeResult();
    if (state.levelIndex >= LEVELS.length - 1) {
      state.homeNotice = "恭喜完成全部 50 关";
      showHomeScreen();
    } else {
      startLevel(state.levelIndex + 1, false);
    }
  });
  state.unlockedLevelIndex = clampLevelIndex(state.unlockedLevelIndex);
  validateLevelBalance();
  initAudioPlayers();
  buildBoardCells();
  startLevel(state.unlockedLevelIndex, true);
  renderHome();
  preloadImages().finally(showHomeScreen);
  document.addEventListener("pointerdown", unlockAudio, { once: true, capture: true });
  document.addEventListener("touchend", unlockAudio, { once: true, capture: true });
  document.addEventListener("WeixinJSBridgeReady", unlockAudio, { once: true });
  document.addEventListener("visibilitychange", handleVisibilityChange);
}

async function preloadImages() {
  const startedAt = performance.now();
  let finished = 0;
  const total = IMAGE_ASSETS.length;
  const tasks = IMAGE_ASSETS.map((source) => new Promise((resolve) => {
    const image = new Image();
    const done = () => {
      finished += 1;
      elements.loadingBar.style.width = `${12 + Math.round((finished / total) * 84)}%`;
      resolve();
    };
    image.decoding = "async";
    image.onload = () => {
      if (image.decode) {
        image.decode().catch(() => {}).finally(done);
      } else {
        done();
      }
    };
    image.onerror = done;
    image.src = source;
  }));
  await Promise.all(tasks);
  const minimumDisplayTime = 420;
  const wait = Math.max(0, minimumDisplayTime - (performance.now() - startedAt));
  if (wait > 0) {
    await new Promise((resolve) => setTimeout(resolve, wait));
  }
}

function buildBoardCells() {
  const fragment = document.createDocumentFragment();
  boardCells = [];
  for (let index = 0; index < CELLS; index += 1) {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "plate-cell";
    cell.dataset.index = String(index);
    cell.dataset.type = "";
    boardCells.push(cell);
    fragment.appendChild(cell);
  }
  elements.board.replaceChildren(fragment);
}

function handleBoardClick(event) {
  const cell = event.target.closest(".plate-cell");
  if (cell && elements.board.contains(cell)) {
    tryPlaceAt(Number(cell.dataset.index));
  }
}

function initAudioPlayers() {
  Object.entries(SOUND_FILES).forEach(([soundKey, fileName]) => {
    const poolSize = soundKey === "clear" ? 3 : 2;
    const pool = Array.from({ length: poolSize }, () => {
      const audio = new Audio(`${AUDIO_ASSET_PATH}${fileName}`);
      audio.preload = "auto";
      audio.playsInline = true;
      audio.setAttribute("playsinline", "");
      audio.setAttribute("webkit-playsinline", "");
      audio.load();
      return audio;
    });
    audioPools.set(soundKey, pool);
  });
}

function unlockAudio() {
  if (!state.sound) {
    return;
  }
  const context = ensureAudioContext();
  if (context && context.state !== "running") {
    context.resume().catch(() => {});
  }
  if (audioPrimed) {
    return;
  }
  const primer = audioPools.get("select")?.[0];
  if (!primer) {
    return;
  }
  audioPrimed = true;
  primer.muted = true;
  primer.currentTime = 0;
  const playAttempt = primer.play();
  if (playAttempt && typeof playAttempt.then === "function") {
    playAttempt.then(() => {
      primer.pause();
      primer.currentTime = 0;
      primer.muted = false;
    }).catch(() => {
      primer.muted = false;
      audioPrimed = false;
    });
  } else {
    primer.pause();
    primer.currentTime = 0;
    primer.muted = false;
  }
}

function handleVisibilityChange() {
  if (!audioContext) {
    return;
  }
  if (document.hidden && audioContext.state === "running") {
    audioContext.suspend().catch(() => {});
  }
}

function readStorageNumber(key, fallback) {
  const value = Number(localStorage.getItem(key));
  return Number.isFinite(value) ? value : fallback;
}

function readSettings() {
  try {
    const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    return {
      sound: settings.sound !== false
    };
  } catch (error) {
    return { sound: true };
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({
    sound: state.sound
  }));
}

function saveProgress() {
  localStorage.setItem(UNLOCKED_LEVEL_KEY, String(state.unlockedLevelIndex));
  localStorage.setItem(BEST_KEY, String(state.best));
  localStorage.setItem(COMPLETED_KEY, String(state.completed));
}

function clampLevelIndex(index) {
  return Math.min(Math.max(Number(index) || 0, 0), LEVELS.length - 1);
}

function renderHome() {
  elements.homeProgress.textContent = state.homeNotice
    || (state.completed ? "已完成全部 50 关" : `已解锁第 ${state.unlockedLevelIndex + 1} 关`);
  elements.homeSoundBtn.setAttribute("aria-pressed", String(state.sound));
  elements.soundBtn.setAttribute("aria-pressed", String(state.sound));
}

function showHomeScreen() {
  elements.loadingScreen.hidden = true;
  elements.homeScreen.hidden = false;
  elements.game.hidden = true;
  clearTimeout(petIdleTimer);
  renderHome();
}

function showGameScreen() {
  elements.loadingScreen.hidden = true;
  elements.homeScreen.hidden = true;
  elements.game.hidden = false;
  setPetMood("idle", "今天也要清盘", 0);
}

function continueChallenge() {
  state.homeNotice = "";
  startLevel(state.unlockedLevelIndex, true);
  showGameScreen();
  feedback("select");
  setPetMood("cheer", "开张啦！", 850);
}

function exitToHome() {
  state.unlockedLevelIndex = Math.max(state.unlockedLevelIndex, state.levelIndex);
  state.homeNotice = `当前第 ${state.levelIndex + 1} 关已保存`;
  saveProgress();
  closeResult();
  showHomeScreen();
  feedback("select");
}

function openHelpModal() {
  elements.helpModal.hidden = false;
  feedback("select");
}

function closeHelpModal() {
  elements.helpModal.hidden = true;
}

function openResetModal() {
  elements.resetModal.hidden = false;
  feedback("restart");
}

function closeResetModal() {
  elements.resetModal.hidden = true;
}

function confirmStartOver() {
  state.unlockedLevelIndex = 0;
  state.completed = false;
  state.score = 0;
  state.levelStartScore = 0;
  state.homeNotice = "";
  saveProgress();
  closeResetModal();
  renderHome();
  startLevel(0, true);
  showGameScreen();
  feedback("restart");
  setPetMood("cheer", "从第一盘开始！", 1000);
}

function validateLevelBalance() {
  const warnings = [];
  LEVELS.forEach((level, levelIndex) => {
    const totals = {};
    let totalPieces = 0;
    level.orders.forEach((order) => {
      order.pattern.forEach((type) => {
        totals[type] = (totals[type] || 0) + order.count;
        totalPieces += order.count;
      });
    });

    Object.entries(totals).forEach(([type, total]) => {
      if (total % 3 !== 0) {
        warnings.push(`第 ${levelIndex + 1} 关 ${TYPES[type].name} 总数为 ${total}`);
      }
    });

    const largestWave = level.blueprint
      ? Math.max(...level.blueprint.map((motif) => motif.sequence.length * 3))
      : totalPieces;
    if (largestWave > CELLS) {
      warnings.push(`第 ${levelIndex + 1} 关单批寿司数 ${largestWave} 超过盘面容量`);
    }
  });

  if (warnings.length > 0) {
    console.warn(`关卡配平需要检查：\n${warnings.join("\n")}`);
  }
}

function startLevel(index, resetScore, keepLevelStartScore = false) {
  const levelIndex = clampLevelIndex(index);
  const level = LEVELS[levelIndex];
  state.levelIndex = levelIndex;
  state.board = Array(CELLS).fill(null);
  state.remaining = level.orders.map((order) => order.count);
  state.tools = { undo: 0, rotate: 0, ...level.tools, ...progressiveTools(levelIndex) };
  state.active = null;
  state.moves = 0;
  state.history = [];
  state.message = "";
  if (resetScore) {
    state.score = 0;
  }
  if (!keepLevelStartScore) {
    state.levelStartScore = state.score;
  }
  selectFirstAvailable();
  render();
  schedulePetIdle();
}

function restartCurrentLevel() {
  closeResult();
  state.score = state.levelStartScore;
  startLevel(state.levelIndex, false, true);
  feedback("restart");
  setPetMood("spin", "重新开张啦", 900);
}

function selectFirstAvailable() {
  const first = state.remaining.findIndex((count) => count > 0);
  if (first >= 0) {
    selectOrder(first, false);
  }
}

function currentLevel() {
  return LEVELS[state.levelIndex];
}

function progressiveTools(index) {
  return toolsForLevel(index + 1);
}

function render() {
  renderStatus();
  renderBoard();
  renderOrders();
  renderTray();
  renderTools();
}

function renderStatus() {
  const level = currentLevel();
  const remainingPieces = state.remaining.reduce((sum, count) => sum + count, 0);
  elements.levelLabel.textContent = `${state.levelIndex + 1}/${LEVELS.length}`;
  elements.levelName.textContent = level.name;
  elements.scoreLabel.textContent = String(state.score);
  elements.bestLabel.textContent = String(state.best);
  elements.remainingLabel.textContent = `剩 ${remainingPieces}`;
  elements.message.textContent = state.message;
  elements.soundBtn.setAttribute("aria-pressed", String(state.sound));
  elements.homeSoundBtn.setAttribute("aria-pressed", String(state.sound));
}

function renderBoard() {
  for (let index = 0; index < CELLS; index += 1) {
    const cell = boardCells[index];
    const type = state.board[index];
    cell.setAttribute("aria-label", type ? `${cellName(index)} ${TYPES[type].name}` : `${cellName(index)} 空`);
    const typeKey = type || "";
    if (cell.dataset.type !== typeKey) {
      cell.dataset.type = typeKey;
      if (type) {
        cell.replaceChildren(makeSushiToken(type));
      } else {
        cell.replaceChildren();
      }
    }
  }
}

function renderOrders() {
  const level = currentLevel();
  if (renderedOrdersLevel !== state.levelIndex) {
    const lanes = [
      { key: "horizontal", label: "横向寿司组合", matches: (order) => order.orientation === "h" },
      { key: "vertical", label: "竖向寿司组合", matches: (order) => order.orientation === "v" }
    ].map((lane) => ({
      ...lane,
      items: level.orders
        .map((order, index) => ({ order, index }))
        .filter(({ order }) => lane.matches(order))
        .sort((a, b) => b.order.pattern.length - a.order.pattern.length || a.index - b.index)
    })).filter((lane) => lane.items.length > 0);
    const fragment = document.createDocumentFragment();
    orderViews = [];
    elements.orders.dataset.layout = lanes.map((lane) => lane.key).join("-");

    lanes.forEach((lane) => {
      const laneElement = document.createElement("div");
      laneElement.className = `order-lane order-lane-${lane.key}`;
      laneElement.setAttribute("aria-label", lane.label);
      lane.items.forEach(({ order, index }) => {
        const button = document.createElement("button");
        const count = document.createElement("span");
        button.type = "button";
        button.className = "order-card";
        button.dataset.length = String(order.pattern.length);
        button.dataset.orientation = order.orientation;
        button.addEventListener("click", () => selectOrder(index, true));
        count.className = "order-count";
        button.append(makePiecePreview(order.pattern, order.orientation), count);
        laneElement.appendChild(button);
        orderViews[index] = { button, count };
      });
      fragment.appendChild(laneElement);
    });
    elements.orders.replaceChildren(fragment);
    renderedOrdersLevel = state.levelIndex;
  }

  level.orders.forEach((order, index) => {
    const view = orderViews[index];
    const remaining = state.remaining[index];
    const active = state.active && state.active.kind === "order" && state.active.orderIndex === index;
    view.button.disabled = remaining <= 0;
    view.button.setAttribute("aria-pressed", String(Boolean(active)));
    view.button.setAttribute("aria-label", orderTitle(order, remaining));
    view.count.textContent = `×${remaining}`;
  });
}

function renderTray() {
  elements.tray.innerHTML = "";
  if (!state.active) {
    elements.tray.disabled = true;
    const empty = document.createElement("span");
    empty.className = "tray-empty";
    empty.textContent = "待出餐";
    elements.tray.appendChild(empty);
    return;
  }

  elements.tray.disabled = false;
  const content = document.createElement("span");
  content.className = "tray-content";
  content.append(makePiecePreview(state.active.pattern, state.active.orientation, "tray-preview"));
  elements.tray.setAttribute("aria-label", activeTitle());
  elements.tray.appendChild(content);
}

function renderTools() {
  updateToolButton(elements.undoBtn, "tool-spatula-undo.webp", "撤回", state.tools.undo);
  updateToolButton(elements.rotateBtn, "tool-rotate-arrows.webp", "旋转", state.tools.rotate);
  updateToolButton(elements.restartBtn, "tool-restart.webp", "重来", "本关");
  elements.undoBtn.disabled = state.tools.undo <= 0 || state.history.length === 0;
  elements.rotateBtn.disabled = state.tools.rotate <= 0 || !state.active || state.active.pattern.length < 2;
  elements.restartBtn.disabled = false;
}

function updateToolButton(button, icon, label, detail) {
  if (!button.dataset.ready) {
    button.innerHTML = toolMarkup(imageIcon(icon), label, detail);
    button.dataset.ready = "true";
  }
  const detailText = typeof detail === "number" ? `×${detail}` : detail;
  button.querySelector(".tool-text b").textContent = detailText;
}

function toolMarkup(icon, label, detail) {
  const detailText = typeof detail === "number" ? `×${detail}` : detail;
  return `<span class="tool-icon" aria-hidden="true">${icon}</span><span class="tool-text"><span>${label}</span><b>${detailText}</b></span>`;
}

function imageIcon(fileName) {
  return `<img src="${UI_ASSET_PATH}${fileName}" alt="">`;
}

function makeSushiToken(type) {
  const token = document.createElement("span");
  const image = document.createElement("img");
  token.className = `sushi-token sushi-${type}`;
  image.src = `${SUSHI_ASSET_PATH}${TYPES[type].asset}`;
  image.alt = "";
  image.width = 192;
  image.height = 192;
  image.decoding = "async";
  image.addEventListener("error", () => {
    image.hidden = true;
  });
  token.appendChild(image);
  return token;
}

function makePiecePreview(pattern, orientation, extraClass = "") {
  const preview = document.createElement("span");
  preview.className = `piece-preview ${orientation === "v" ? "vertical" : ""} ${extraClass}`.trim();
  preview.dataset.length = String(pattern.length);
  preview.style.setProperty("--piece-len", String(pattern.length));
  pattern.forEach((type) => {
    const mini = document.createElement("span");
    mini.className = "mini-cell";
    mini.appendChild(makeSushiToken(type));
    preview.appendChild(mini);
  });
  return preview;
}

function selectOrder(index, shouldRender) {
  const level = currentLevel();
  if (!level.orders[index] || state.remaining[index] <= 0) {
    return;
  }
  const order = level.orders[index];
  state.active = {
    kind: "order",
    orderIndex: index,
    pattern: [...order.pattern],
    orientation: order.orientation
  };
  state.message = "";
  if (shouldRender) {
    feedback("select");
    setPetMood("peek", "这一盘有戏", 750);
    render();
  }
}

function rotateActive() {
  if (!state.active || state.active.pattern.length < 2) {
    setMessage("当前组合无需旋转");
    return;
  }
  if (state.tools.rotate <= 0) {
    setMessage("旋转次数用完了");
    return;
  }
  state.active.orientation = state.active.orientation === "h" ? "v" : "h";
  state.tools.rotate -= 1;
  setMessage("已旋转当前组合");
  feedback("rotate");
  setPetMood("spin", "换个方向看看", 850);
  render();
}

function undoMove() {
  if (state.tools.undo <= 0) {
    setMessage("撤回次数用完了");
    return;
  }
  if (state.history.length === 0) {
    setMessage("还没有可撤回的出餐");
    return;
  }
  const undoLeft = state.tools.undo - 1;
  const snapshot = state.history.pop();
  state.board = [...snapshot.board];
  state.remaining = [...snapshot.remaining];
  state.tools = { ...snapshot.tools, undo: undoLeft };
  state.active = snapshot.active ? cloneActive(snapshot.active) : null;
  state.score = snapshot.score;
  state.moves = snapshot.moves;
  setMessage("已撤回上一道寿司");
  feedback("undo");
  setPetMood("peek", "铲回来啦", 850);
  render();
}

function tryPlaceAt(startIndex) {
  if (!state.active) {
    setMessage("先选择今日待出餐");
    return false;
  }
  const indexes = getPlacementIndexes(startIndex, state.active.pattern, state.active.orientation, true);
  if (!indexes) {
    setMessage("这里放不下");
    feedback("invalid");
    setPetMood("oops", "这里挤不下", 900);
    render();
    return false;
  }

  pushHistory();
  indexes.forEach((index, offset) => {
    state.board[index] = state.active.pattern[offset];
  });
  consumeActive();
  state.moves += 1;
  const cleared = clearMatches();
  if (cleared === 0) {
    setMessage("已放入寿司盘");
    feedback("place");
    setPetMood("hop", "摆得漂亮", 650);
  }
  if (!state.active) {
    selectFirstAvailable();
  }
  render();
  checkEndState();
  return true;
}

function consumeActive() {
  if (state.active.kind === "order") {
    const index = state.active.orderIndex;
    state.remaining[index] -= 1;
    if (state.remaining[index] <= 0) {
      state.active = null;
    }
  } else {
    state.active = null;
  }
}

function pushHistory() {
  state.history.push({
    board: [...state.board],
    remaining: [...state.remaining],
    tools: { ...state.tools },
    active: state.active ? cloneActive(state.active) : null,
    score: state.score,
    moves: state.moves
  });
  if (state.history.length > 30) {
    state.history.shift();
  }
}

function clearMatches() {
  const matches = findMatches();
  if (matches.size === 0) {
    return 0;
  }
  matches.forEach((index) => {
    state.board[index] = null;
  });
  const gained = matches.size * 10 + Math.max(0, matches.size - 3) * 4;
  state.score += gained;
  setMessage(`消除 ${matches.size} 个寿司 +${gained}`);
  feedback("clear");
  setPetMood("cheer", matches.size > 3 ? "连消！真厉害" : "噗！消掉啦", 1100);
  burstBoardFx(matches.size);
  return matches.size;
}

function findMatches() {
  const matches = new Set();
  for (let row = 0; row < SIZE; row += 1) {
    scanLine(matches, Array.from({ length: SIZE }, (_, col) => row * SIZE + col));
  }
  for (let col = 0; col < SIZE; col += 1) {
    scanLine(matches, Array.from({ length: SIZE }, (_, row) => row * SIZE + col));
  }
  return matches;
}

function scanLine(matches, indexes) {
  let runType = null;
  let run = [];
  indexes.forEach((index) => {
    const type = state.board[index];
    if (type && type === runType) {
      run.push(index);
    } else {
      collectRun(matches, run);
      runType = type;
      run = type ? [index] : [];
    }
  });
  collectRun(matches, run);
}

function collectRun(matches, run) {
  if (run.length >= 3) {
    run.forEach((index) => matches.add(index));
  }
}

function getPlacementIndexes(startIndex, pattern, orientation, requireEmpty) {
  const row = Math.floor(startIndex / SIZE);
  const col = startIndex % SIZE;
  const indexes = [];
  for (let offset = 0; offset < pattern.length; offset += 1) {
    const nextRow = orientation === "h" ? row : row + offset;
    const nextCol = orientation === "h" ? col + offset : col;
    if (nextRow >= SIZE || nextCol >= SIZE) {
      return null;
    }
    const index = nextRow * SIZE + nextCol;
    if (requireEmpty && state.board[index]) {
      return null;
    }
    indexes.push(index);
  }
  return indexes;
}

function checkEndState() {
  const allOrdersDone = state.remaining.every((count) => count <= 0);
  const boardEmpty = state.board.every((type) => !type);
  if (allOrdersDone && boardEmpty) {
    finishLevel();
    return;
  }
  if (allOrdersDone && !boardEmpty) {
    feedback("fail");
    setPetMood("oops", "还差一点点", 0);
    showResult("盘面未清空", "还有寿司没有抵消，重新排一次会更稳。", "再来一局", true);
    return;
  }
  if (!allOrdersDone && !hasAnyMove()) {
    feedback("fail");
    setPetMood("oops", "再想一步", 0);
    showResult("盘子满了", "当前组合已经没有合适位置。", "重试本关", true);
  }
}

function hasAnyMove() {
  const level = currentLevel();
  return level.orders.some((order, index) => {
    if (state.remaining[index] <= 0) {
      return false;
    }
    const orientations = state.tools.rotate > 0 && order.pattern.length > 1
      ? [order.orientation, order.orientation === "h" ? "v" : "h"]
      : [order.orientation];
    return orientations.some((orientation) => canFit(order.pattern, orientation));
  });
}

function canFit(pattern, orientation) {
  for (let index = 0; index < CELLS; index += 1) {
    if (getPlacementIndexes(index, pattern, orientation, true)) {
      return true;
    }
  }
  return false;
}

function finishLevel() {
  const bonus = 100 + (state.levelIndex + 1) * 25;
  state.score += bonus;
  state.best = Math.max(state.best, state.score);
  state.unlockedLevelIndex = Math.max(
    state.unlockedLevelIndex,
    Math.min(state.levelIndex + 1, LEVELS.length - 1)
  );
  saveProgress();
  renderStatus();
  const finalLevel = state.levelIndex >= LEVELS.length - 1;
  if (finalLevel) {
    state.completed = true;
    saveProgress();
  }
  feedback("success");
  setPetMood("cheer", finalLevel ? "全部清盘！" : "营业完成！", 0);
  showResult(
    finalLevel ? "恭喜全部通关" : "本关完成",
    finalLevel
      ? `50 道关卡全部清盘，最终分数 ${state.score}！`
      : `本关奖励 +${bonus}，当前分数 ${state.score}。`,
    finalLevel ? "返回首页" : "下一关",
    false
  );
}

function showResult(title, text, nextLabel, hideNext) {
  elements.resultTitle.textContent = title;
  elements.resultText.textContent = text;
  elements.nextBtn.textContent = nextLabel;
  elements.nextBtn.hidden = hideNext;
  elements.resultCompanion.dataset.mood = title.includes("完成") ? "cheer" : "oops";
  elements.resultModal.hidden = false;
}

function closeResult() {
  elements.resultModal.hidden = true;
  elements.nextBtn.hidden = false;
}

const PET_HINTS = [
  "先找能凑三连的边",
  "竖着摆也能消哦",
  "留一点转向空间",
  "别急，我陪你想"
];

function setPetMood(mood, message, duration = 900) {
  clearTimeout(petTimer);
  elements.companionBtn.dataset.mood = "reset";
  void elements.companionBtn.offsetWidth;
  elements.companionBtn.dataset.mood = mood;
  elements.companionBubble.textContent = message;
  elements.companionBubble.classList.remove("is-fresh");
  void elements.companionBubble.offsetWidth;
  elements.companionBubble.classList.add("is-fresh");
  if (duration > 0) {
    petTimer = setTimeout(() => {
      elements.companionBtn.dataset.mood = "idle";
      elements.companionBubble.textContent = "我在旁边看着呢";
      schedulePetIdle();
    }, duration);
  }
}

function schedulePetIdle() {
  clearTimeout(petIdleTimer);
  if (elements.game.hidden || !elements.resultModal.hidden) {
    return;
  }
  petIdleTimer = setTimeout(() => {
    const hint = PET_HINTS[(state.moves + state.levelIndex) % PET_HINTS.length];
    setPetMood("peek", hint, 2200);
  }, 8500);
}

function interactWithCompanion() {
  const hint = PET_HINTS[Math.floor(Math.random() * PET_HINTS.length)];
  feedback("select");
  setPetMood("hop", hint, 1500);
}

function burstBoardFx(strength) {
  const rect = elements.board.getBoundingClientRect();
  const count = Math.min(14, 6 + strength);
  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("i");
    const angle = (Math.PI * 2 * index) / count + Math.random() * 0.35;
    const distance = 34 + Math.random() * 58;
    particle.className = index % 3 === 0 ? "fx-star" : "fx-bubble";
    particle.style.left = `${rect.left + rect.width * (0.42 + Math.random() * 0.16)}px`;
    particle.style.top = `${rect.top + rect.height * (0.42 + Math.random() * 0.16)}px`;
    particle.style.setProperty("--fx-x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--fx-y", `${Math.sin(angle) * distance}px`);
    particle.style.setProperty("--fx-delay", `${index * 12}ms`);
    elements.fxLayer.appendChild(particle);
    setTimeout(() => particle.remove(), 760);
  }
}

function startDrag(event) {
  if (!state.active) {
    setMessage("先选择今日待出餐");
    return;
  }
  if (dragGhost) {
    return;
  }
  if (event.button !== undefined && event.button !== 0) {
    return;
  }
  event.preventDefault();
  clearPreview();
  dragGhost = document.createElement("div");
  dragGhost.className = "drag-ghost";
  dragGhost.appendChild(makePiecePreview(state.active.pattern, state.active.orientation, "drag-preview"));
  document.body.appendChild(dragGhost);
  moveDrag(event);
  document.addEventListener("pointermove", moveDrag, { passive: true });
  document.addEventListener("pointerup", endDrag, { once: true });
  document.addEventListener("pointercancel", cancelDrag, { once: true });
}

function moveDrag(event) {
  if (!dragGhost) {
    return;
  }
  dragPoint = { x: event.clientX, y: event.clientY };
  if (!dragFrame) {
    dragFrame = requestAnimationFrame(updateDragFrame);
  }
}

function updateDragFrame() {
  dragFrame = 0;
  if (!dragGhost || !dragPoint) {
    return;
  }
  const { x, y } = dragPoint;
  dragGhost.style.transform = `translate3d(${x - 24}px, ${y - 24}px, 0)`;
  const cell = cellFromPoint(x, y);
  if (!cell || !state.active) {
    if (previewStartIndex !== -1) {
      clearPreview();
    }
    return;
  }
  const startIndex = Number(cell.dataset.index);
  if (startIndex === previewStartIndex) {
    return;
  }
  clearPreview();
  previewStartIndex = startIndex;
  const footprint = getPlacementIndexes(startIndex, state.active.pattern, state.active.orientation, false);
  const fits = Boolean(getPlacementIndexes(startIndex, state.active.pattern, state.active.orientation, true));
  if (footprint) {
    footprint.forEach((index) => {
      const target = boardCells[index];
      if (target) {
        target.classList.add(fits ? "preview-good" : "preview-bad");
        previewCells.push(target);
      }
    });
  } else {
    cell.classList.add("preview-bad");
    previewCells.push(cell);
  }
}

function endDrag(event) {
  document.removeEventListener("pointermove", moveDrag);
  document.removeEventListener("pointercancel", cancelDrag);
  if (dragFrame) {
    cancelAnimationFrame(dragFrame);
    dragFrame = 0;
  }
  const cell = cellFromPoint(event.clientX, event.clientY);
  removeDragGhost();
  if (cell) {
    tryPlaceAt(Number(cell.dataset.index));
  } else {
    setMessage("未放入寿司盘");
    feedback("invalid");
    setPetMood("oops", "盘子在上面哦", 850);
  }
}

function cancelDrag() {
  document.removeEventListener("pointermove", moveDrag);
  document.removeEventListener("pointerup", endDrag);
  if (dragFrame) {
    cancelAnimationFrame(dragFrame);
    dragFrame = 0;
  }
  removeDragGhost();
}

function removeDragGhost() {
  if (dragGhost) {
    dragGhost.remove();
    dragGhost = null;
  }
  dragPoint = null;
  clearPreview();
}

function cellFromPoint(x, y) {
  const element = document.elementFromPoint(x, y);
  return element ? element.closest(".plate-cell") : null;
}

function clearPreview() {
  previewCells.forEach((cell) => {
    cell.classList.remove("preview-good", "preview-bad");
  });
  previewCells = [];
  previewStartIndex = -1;
}

function toggleSound() {
  state.sound = !state.sound;
  saveSettings();
  renderHome();
  renderStatus();
  if (state.sound) {
    unlockAudio();
    feedback("select");
  } else {
    audioPools.forEach((pool) => pool.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    }));
  }
}

function feedback(soundKey) {
  if (!state.sound) {
    return;
  }
  playGameSound(soundKey);
}

function ensureAudioContext() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      return null;
    }
    if (!audioContext) {
      try {
        audioContext = new AudioContext({ latencyHint: "interactive" });
      } catch (error) {
        audioContext = new AudioContext();
      }
      const compressor = audioContext.createDynamicsCompressor();
      audioMaster = audioContext.createGain();
      audioMaster.gain.value = 0.46;
      compressor.threshold.value = -18;
      compressor.knee.value = 12;
      compressor.ratio.value = 5;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.16;
      audioMaster.connect(compressor);
      compressor.connect(audioContext.destination);

      noiseBuffer = audioContext.createBuffer(1, Math.floor(audioContext.sampleRate * 0.45), audioContext.sampleRate);
      const noise = noiseBuffer.getChannelData(0);
      for (let index = 0; index < noise.length; index += 1) {
        noise[index] = (Math.random() * 2 - 1) * (1 - index / noise.length);
      }
    }
    if (audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }
    return audioContext;
  } catch (error) {
    return null;
  }
}

function playGameSound(soundKey) {
  const pool = audioPools.get(soundKey);
  if (!pool || pool.length === 0) {
    playSynthSound(soundKey);
    return;
  }
  const player = pool.find((audio) => audio.paused || audio.ended) || pool[0];
  try {
    player.pause();
    player.currentTime = 0;
    player.muted = false;
    player.volume = SOUND_VOLUME[soundKey] || 0.7;
    const playAttempt = player.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => playSynthSound(soundKey));
    }
  } catch (error) {
    playSynthSound(soundKey);
  }
}

function playSynthSound(soundKey) {
  const context = ensureAudioContext();
  if (!context || !audioMaster) {
    return;
  }
  const now = context.currentTime + 0.006;
  switch (soundKey) {
    case "select":
      playTone(now, 760, 540, 0.065, 0.065, "sine");
      playTone(now + 0.012, 1180, 860, 0.045, 0.035, "sine");
      break;
    case "place":
      playTone(now, 390, 205, 0.11, 0.09, "sine");
      playNoise(now, 0.075, 0.045, "lowpass", 1250, 430);
      break;
    case "clear":
      [0, 0.038, 0.078].forEach((offset, index) => {
        playTone(now + offset, 470 + index * 120, 860 + index * 180, 0.085, 0.095 - index * 0.012, "sine");
        playNoise(now + offset, 0.05, 0.04, "bandpass", 980 + index * 320, 1900 + index * 260);
      });
      playTone(now + 0.13, 1320, 1660, 0.12, 0.035, "sine");
      break;
    case "undo":
      playNoise(now, 0.19, 0.085, "bandpass", 1700, 430);
      playTone(now + 0.075, 240, 165, 0.09, 0.055, "triangle");
      break;
    case "rotate":
      playNoise(now, 0.14, 0.055, "bandpass", 520, 1880);
      playTone(now + 0.035, 510, 275, 0.12, 0.065, "sine");
      break;
    case "restart":
      playTone(now, 280, 135, 0.18, 0.105, "sine");
      playNoise(now + 0.025, 0.13, 0.05, "lowpass", 950, 260);
      break;
    case "invalid":
      playTone(now, 190, 118, 0.075, 0.075, "triangle");
      playNoise(now, 0.045, 0.038, "lowpass", 720, 310);
      break;
    case "success":
      [523, 659, 784, 1047].forEach((frequency, index) => {
        playTone(now + index * 0.075, frequency, frequency * 1.02, 0.18, 0.07, index === 3 ? "sine" : "triangle");
      });
      playNoise(now + 0.22, 0.12, 0.025, "highpass", 2600, 4300);
      break;
    case "fail":
      [392, 311, 233].forEach((frequency, index) => {
        playTone(now + index * 0.105, frequency, frequency * 0.82, 0.17, 0.075, "triangle");
      });
      playNoise(now + 0.02, 0.16, 0.035, "lowpass", 620, 210);
      break;
    default:
      playTone(now, 640, 440, 0.07, 0.05, "sine");
  }
}

function playTone(start, fromFrequency, toFrequency, duration, volume, type) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(fromFrequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(40, toFrequency), start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(audioMaster);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function playNoise(start, duration, volume, filterType, fromFrequency, toFrequency) {
  if (!noiseBuffer) {
    return;
  }
  const source = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  source.buffer = noiseBuffer;
  filter.type = filterType;
  filter.Q.value = filterType === "bandpass" ? 1.1 : 0.65;
  filter.frequency.setValueAtTime(fromFrequency, start);
  filter.frequency.exponentialRampToValueAtTime(Math.max(80, toFrequency), start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audioMaster);
  source.start(start, Math.random() * 0.12);
  source.stop(start + duration + 0.01);
}

function setMessage(message) {
  state.message = message;
  elements.message.textContent = message;
}

function orderTitle(order, remaining) {
  const names = order.pattern.map((type) => TYPES[type].name).join("+");
  return order.pattern.length > 1 ? `(${names}) × ${remaining}` : `${names} × ${remaining}`;
}

function activeTitle() {
  const names = state.active.pattern.map((type) => TYPES[type].name).join("+");
  const direction = state.active.orientation === "v" ? "竖" : "横";
  return `${names} · ${direction}`;
}

function cellName(index) {
  return `第 ${Math.floor(index / SIZE) + 1} 行第 ${index % SIZE + 1} 列`;
}

function cloneActive(active) {
  return {
    kind: active.kind,
    orderIndex: active.orderIndex,
    pattern: [...active.pattern],
    orientation: active.orientation
  };
}

init();
