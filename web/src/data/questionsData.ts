import { DiagnosticQuestion } from '../types';

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  // SECTION 1: MATHEMATICS (Q1 - Q8)
  {
    id: 1,
    section: 'Mathematics',
    topic: 'Matrices & Determinants',
    difficulty: 'Medium',
    questionText: 'If A is a 3x3 non-singular matrix and |A| = 4, what is the value of |adj(A)|?',
    options: [
      { id: 'a', text: '4' },
      { id: 'b', text: '16' },
      { id: 'c', text: '64' },
      { id: 'd', text: '1/4' }
    ],
    correctOptionId: 'b',
    explanation: 'For any n x n matrix, |adj(A)| = |A|^(n-1). Here n = 3 and |A| = 4, so |adj(A)| = 4^(3-1) = 4^2 = 16.'
  },
  {
    id: 2,
    section: 'Mathematics',
    topic: 'Calculus & Limits',
    difficulty: 'Easy',
    questionText: 'Evaluate the limit: lim (x -> 0) [sin(5x) / (2x)].',
    options: [
      { id: 'a', text: '5/2' },
      { id: 'b', text: '2/5' },
      { id: 'c', text: '0' },
      { id: 'd', text: '1' }
    ],
    correctOptionId: 'a',
    explanation: 'Using the standard trigonometric limit theorem lim(u->0) [sin(u)/u] = 1, we multiply and divide by 5/2 to get (5/2) * lim(5x->0)[sin(5x)/(5x)] = 5/2.'
  },
  {
    id: 3,
    section: 'Mathematics',
    topic: 'Integration & Derivatives',
    difficulty: 'Medium',
    questionText: 'What is the integral of e^(2x) * cos(3x) dx?',
    options: [
      { id: 'a', text: '(e^(2x) / 13) * [2*cos(3x) + 3*sin(3x)] + C' },
      { id: 'b', text: '(e^(2x) / 13) * [3*cos(3x) - 2*sin(3x)] + C' },
      { id: 'c', text: '(e^(2x) / 5) * [2*cos(3x) + 3*sin(3x)] + C' },
      { id: 'd', text: '(e^(2x) / 7) * [cos(3x) + sin(3x)] + C' }
    ],
    correctOptionId: 'a',
    explanation: 'Standard formula: ∫ e^(ax) cos(bx) dx = [e^(ax) / (a^2 + b^2)] * (a cos bx + b sin bx) + C. Here a=2, b=3, so a^2 + b^2 = 4 + 9 = 13.'
  },
  {
    id: 4,
    section: 'Mathematics',
    topic: 'Analytical Geometry (Conics)',
    difficulty: 'Challenging',
    questionText: 'What is the eccentricity of the hyperbola 9x^2 - 16y^2 = 144?',
    options: [
      { id: 'a', text: '5/4' },
      { id: 'b', text: '5/3' },
      { id: 'c', text: '4/3' },
      { id: 'd', text: '25/16' }
    ],
    correctOptionId: 'a',
    explanation: 'Dividing by 144 gives x^2/16 - y^2/9 = 1. Here a^2 = 16 (a = 4), b^2 = 9. For a hyperbola, c^2 = a^2 + b^2 = 16 + 9 = 25 (c = 5). Eccentricity e = c/a = 5/4.'
  },
  {
    id: 5,
    section: 'Mathematics',
    topic: 'Complex Numbers',
    difficulty: 'Easy',
    questionText: 'What is the modulus and principal argument of the complex number z = -1 - i*sqrt(3)?',
    options: [
      { id: 'a', text: '|z| = 2, Arg(z) = -2π/3' },
      { id: 'b', text: '|z| = 2, Arg(z) = 4π/3' },
      { id: 'c', text: '|z| = 4, Arg(z) = -π/3' },
      { id: 'd', text: '|z| = 1, Arg(z) = 2π/3' }
    ],
    correctOptionId: 'a',
    explanation: '|z| = sqrt((-1)^2 + (-sqrt(3))^2) = sqrt(1 + 3) = 2. Since both real and imaginary parts are negative, z lies in the 3rd quadrant. The reference angle is tan^(-1)(sqrt(3)) = π/3. Principal argument is -(π - π/3) = -2π/3.'
  },
  {
    id: 6,
    section: 'Mathematics',
    topic: 'Vectors & 3D Geometry',
    difficulty: 'Medium',
    questionText: 'If vector u = 2i + 3j - k and vector v = -i + 2j + 4k, what is the scalar dot product u · v?',
    options: [
      { id: 'a', text: '0 (orthogonal)' },
      { id: 'b', text: '4' },
      { id: 'c', text: '-2' },
      { id: 'd', text: '8' }
    ],
    correctOptionId: 'a',
    explanation: 'u · v = (2)(-1) + (3)(2) + (-1)(4) = -2 + 6 - 4 = 0. Since the dot product is 0, the two vectors are perpendicular (orthogonal).'
  },
  {
    id: 7,
    section: 'Mathematics',
    topic: 'Permutations & Combinations',
    difficulty: 'Medium',
    questionText: 'In how many ways can 4 boys and 3 girls be seated in a row such that all 3 girls always sit together?',
    options: [
      { id: 'a', text: '720' },
      { id: 'b', text: '144' },
      { id: 'c', text: '5040' },
      { id: 'd', text: '240' }
    ],
    correctOptionId: 'a',
    explanation: 'Treat the 3 girls as a single unit/block. We now have 4 boys + 1 block = 5 entities to arrange, which can be done in 5! = 120 ways. The 3 girls inside their block can be arranged in 3! = 6 ways. Total arrangements = 120 * 6 = 720.'
  },
  {
    id: 8,
    section: 'Mathematics',
    topic: 'Trigonometry',
    difficulty: 'Easy',
    questionText: 'If tan(θ) = 3/4 and θ is in the third quadrant, what is the value of sec(θ)?',
    options: [
      { id: 'a', text: '-5/4' },
      { id: 'b', text: '5/4' },
      { id: 'c', text: '-4/5' },
      { id: 'd', text: '-5/3' }
    ],
    correctOptionId: 'a',
    explanation: 'sec^2(θ) = 1 + tan^2(θ) = 1 + 9/16 = 25/16. In the 3rd quadrant, cosine and secant are negative, so sec(θ) = -5/4.'
  },

  // SECTION 2: ENGLISH (Q9 - Q15)
  {
    id: 9,
    section: 'English',
    topic: 'Vocabulary & Synonyms',
    difficulty: 'Medium',
    questionText: 'Choose the word that is most nearly SYNONYMOUS with "EPHEMERAL":',
    options: [
      { id: 'a', text: 'Transient' },
      { id: 'b', text: 'Eternal' },
      { id: 'c', text: 'Plausible' },
      { id: 'd', text: 'Lethargic' }
    ],
    correctOptionId: 'a',
    explanation: '"Ephemeral" means lasting for a very short time. "Transient" is its exact synonym, meaning temporary or short-lived.'
  },
  {
    id: 10,
    section: 'English',
    topic: 'Sentence Correction & Grammar',
    difficulty: 'Medium',
    questionText: 'Identify the grammatically correct sentence:',
    options: [
      { id: 'a', text: 'Neither the dean nor the professors was present at the convocation.' },
      { id: 'b', text: 'Neither the dean nor the professors were present at the convocation.' },
      { id: 'c', text: 'Neither the dean or the professors was present at the convocation.' },
      { id: 'd', text: 'Neither the dean nor the professors has been present at the convocation.' }
    ],
    correctOptionId: 'b',
    explanation: 'In a "neither...nor" construction with compound subjects of differing numbers, the verb agrees with the subject closest to it ("professors" is plural, requiring "were").'
  },
  {
    id: 11,
    section: 'English',
    topic: 'Reading Comprehension',
    passageText: 'The advent of decentralized cryptographic ledgers has prompted sovereign central banks to investigate Central Bank Digital Currencies (CBDCs). Unlike volatile algorithmic tokens, CBDCs retain legal tender status, offering the computational programmable efficiency of digital assets while anchored by monetary policy guarantees.',
    difficulty: 'Challenging',
    questionText: 'According to the passage, what is the primary structural distinction of CBDCs compared to algorithmic tokens?',
    options: [
      { id: 'a', text: 'They operate entirely off-chain without digital infrastructure.' },
      { id: 'b', text: 'They maintain legal tender status backed by institutional monetary policy.' },
      { id: 'c', text: 'They cannot be programmed or transacted computationally.' },
      { id: 'd', text: 'They are inherently more volatile than private cryptocurrencies.' }
    ],
    correctOptionId: 'b',
    explanation: 'The passage explicitly states that CBDCs "retain legal tender status, offering... programmable efficiency... while anchored by monetary policy guarantees," distinguishing them from volatile algorithmic tokens.'
  },
  {
    id: 12,
    section: 'English',
    topic: 'Analogies',
    difficulty: 'Medium',
    questionText: 'PRODIGAL : SQUANDER ::',
    options: [
      { id: 'a', text: 'Miser : Hoard' },
      { id: 'b', text: 'Scholar : Ignorance' },
      { id: 'c', text: 'Nomad : Settle' },
      { id: 'd', text: 'Tyrant : Benevolence' }
    ],
    correctOptionId: 'a',
    explanation: 'A prodigal person is characterized by squandering resources, just as a miser is defined by hoarding them.'
  },
  {
    id: 13,
    section: 'English',
    topic: 'Idioms & Prepositions',
    difficulty: 'Easy',
    questionText: 'The research committee arrived _____ a consensus after analyzing the empirical data.',
    options: [
      { id: 'a', text: 'at' },
      { id: 'b', text: 'to' },
      { id: 'c', text: 'on' },
      { id: 'd', text: 'with' }
    ],
    correctOptionId: 'a',
    explanation: 'The standard idiomatic prepositional phrase is "arrive at a decision" or "arrive at a consensus".'
  },
  {
    id: 14,
    section: 'English',
    topic: 'Antonyms',
    difficulty: 'Easy',
    questionText: 'Select the word that is most OPPOSITE in meaning to "CANDID":',
    options: [
      { id: 'a', text: 'Deceitful' },
      { id: 'b', text: 'Frank' },
      { id: 'c', text: 'Artless' },
      { id: 'd', text: 'Lucid' }
    ],
    correctOptionId: 'a',
    explanation: '"Candid" means truthful, straightforward, and open. Its antonym is "deceitful" (dishonest or misleading).'
  },
  {
    id: 15,
    section: 'English',
    topic: 'Subject-Verb Agreement',
    difficulty: 'Medium',
    questionText: 'A bouquet of yellow roses, together with two handwritten letters, _____ delivered to the department office.',
    options: [
      { id: 'a', text: 'was' },
      { id: 'b', text: 'were' },
      { id: 'c', text: 'have been' },
      { id: 'd', text: 'are' }
    ],
    correctOptionId: 'a',
    explanation: 'Parenthetical phrases introduced by "together with", "as well as", or "along with" do not alter the number of the true grammatical subject ("A bouquet", which is singular).'
  },

  // SECTION 3: LOGICAL & ANALYTICAL REASONING (Q16 - Q20)
  {
    id: 16,
    section: 'Logical Reasoning',
    topic: 'Deductive Syllogisms',
    difficulty: 'Medium',
    questionText: 'Statements:\n1. All algorithms require memory.\n2. Some memory devices are volatile.\nConclusion I: Some algorithms are volatile.\nConclusion II: Anything requiring memory uses physical resources.\nWhich conclusion logically follows?',
    options: [
      { id: 'a', text: 'Neither conclusion I nor II follows directly from the given premises alone' },
      { id: 'b', text: 'Only Conclusion I follows' },
      { id: 'c', text: 'Both Conclusion I and II follow' },
      { id: 'd', text: 'Only Conclusion II follows' }
    ],
    correctOptionId: 'a',
    explanation: 'From "all algorithms require memory" and "some memory is volatile", we cannot conclude algorithms themselves are volatile (distributive fallacy). Statement II introduces "physical resources" which is an external premise not stated in the original statements.'
  },
  {
    id: 17,
    section: 'Logical Reasoning',
    topic: 'Number & Letter Series',
    difficulty: 'Easy',
    questionText: 'Find the next term in the sequence: 4, 9, 25, 49, 121, 169, ___',
    options: [
      { id: 'a', text: '289' },
      { id: 'b', text: '225' },
      { id: 'c', text: '196' },
      { id: 'd', text: '361' }
    ],
    correctOptionId: 'a',
    explanation: 'These are the squares of consecutive prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121, 13^2=169. The next prime number is 17, and 17^2 = 289.'
  },
  {
    id: 18,
    section: 'Logical Reasoning',
    topic: 'Analytical Seating Arrangement',
    difficulty: 'Challenging',
    questionText: 'Six students (A, B, C, D, E, F) sit in a circle facing inward. A sits opposite D. B is immediately to the right of A. C is not adjacent to D or A. E sits opposite B. Who sits immediately to the left of D?',
    options: [
      { id: 'a', text: 'F' },
      { id: 'b', text: 'C' },
      { id: 'c', text: 'B' },
      { id: 'd', text: 'E' }
    ],
    correctOptionId: 'b',
    explanation: 'Placing positions 1 to 6 clockwise: Position 1 = A, Position 4 = D. B is right of A (pos 2). E sits opposite B (pos 5). C cannot sit at pos 3 (adjacent to D) or pos 6 (adjacent to A), so C is at pos 3 or pos 5... analyzing constraints places C at pos 3 (immediately to left of D from D\'s inward perspective).'
  },
  {
    id: 19,
    section: 'Logical Reasoning',
    topic: 'Coding & Decoding',
    difficulty: 'Medium',
    questionText: 'If "LOGIC" is encoded as "OJFLF", how is "SMART" encoded under the same rule?',
    options: [
      { id: 'a', text: 'VPDUW' },
      { id: 'b', text: 'VODUW' },
      { id: 'c', text: 'TODVS' },
      { id: 'd', text: 'UPEUX' }
    ],
    correctOptionId: 'a',
    explanation: 'Each letter is shifted forward by +3 positions in the alphabet: L(+3)->O, O(+3)->R (here pattern is +3 for each letter: S->V, M->P, A->D, R->U, T->W) => VPDUW.'
  },
  {
    id: 20,
    section: 'Logical Reasoning',
    topic: 'Direction Sense',
    difficulty: 'Easy',
    questionText: 'Ali walks 10m North, turns right and walks 6m, turns right again and walks 10m, and finally turns left and walks 4m. How far and in which direction is Ali from his initial starting point?',
    options: [
      { id: 'a', text: '10m East' },
      { id: 'b', text: '10m West' },
      { id: 'c', text: '20m East' },
      { id: 'd', text: '6m North' }
    ],
    correctOptionId: 'a',
    explanation: 'Starting at (0,0): 10m North -> (0, 10). Turn right 6m East -> (6, 10). Turn right 10m South -> (6, 0). Turn left 4m East -> (10, 0). Ali is 10 meters East of the origin.'
  },

  // SECTION 4: PHYSICS & COMPUTING (Q21 - Q25)
  {
    id: 21,
    section: 'Physics & Computing',
    topic: 'Electromagnetism',
    difficulty: 'Medium',
    questionText: 'A proton moves with velocity v perpendicular to a uniform magnetic field B. What is the path of the proton and does the magnetic force perform work on it?',
    options: [
      { id: 'a', text: 'Circular path; Work done = 0' },
      { id: 'b', text: 'Helical path; Work done > 0' },
      { id: 'c', text: 'Straight line; Work done = 0' },
      { id: 'd', text: 'Parabolic path; Work done = qvB' }
    ],
    correctOptionId: 'a',
    explanation: 'Magnetic Lorentz force F = q(v x B) is always perpendicular to instantaneous velocity v. Since force is perpendicular to displacement (F · dr = 0), work done is always zero, resulting in uniform circular motion.'
  },
  {
    id: 22,
    section: 'Physics & Computing',
    topic: 'Wave Optics & Interference',
    difficulty: 'Medium',
    questionText: 'In Young’s Double Slit Experiment, if the distance between the two slits is halved and the screen distance is doubled, the fringe width will:',
    options: [
      { id: 'a', text: 'Quadruple (increase by 4 times)' },
      { id: 'b', text: 'Double' },
      { id: 'c', text: 'Remain unchanged' },
      { id: 'd', text: 'Halve' }
    ],
    correctOptionId: 'a',
    explanation: 'Fringe width β = (λ * L) / d. If L becomes 2L and d becomes d/2, new fringe width β\' = (λ * 2L) / (d/2) = 4 * (λL / d) = 4β.'
  },
  {
    id: 23,
    section: 'Physics & Computing',
    topic: 'Data Structures & Algorithms',
    difficulty: 'Easy',
    questionText: 'What is the worst-case time complexity of searching for an element in a balanced Binary Search Tree (AVL Tree) containing N elements?',
    options: [
      { id: 'a', text: 'O(log N)' },
      { id: 'b', text: 'O(N)' },
      { id: 'c', text: 'O(N log N)' },
      { id: 'd', text: 'O(1)' }
    ],
    correctOptionId: 'a',
    explanation: 'Because an AVL tree maintains height balance (height h = O(log N)), tree traversal in the worst case inspects at most h nodes, giving O(log N) time.'
  },
  {
    id: 24,
    section: 'Physics & Computing',
    topic: 'Modern Physics & Photoelectric Effect',
    difficulty: 'Medium',
    questionText: 'If the frequency of incident light on a photosensitive metal surface is doubled, what happens to the maximum kinetic energy of the emitted photoelectrons?',
    options: [
      { id: 'a', text: 'It increases to more than double its initial value' },
      { id: 'b', text: 'It exactly doubles' },
      { id: 'c', text: 'It stays constant' },
      { id: 'd', text: 'It quadruples' }
    ],
    correctOptionId: 'a',
    explanation: 'Einstein\'s equation: K_max = hf - Φ. If f doubles to 2f, new K_max\' = 2hf - Φ = 2(hf - Φ) + Φ = 2(K_max) + Φ. Since work function Φ > 0, K_max\' is strictly greater than twice K_max.'
  },
  {
    id: 25,
    section: 'Physics & Computing',
    topic: 'Logic Gates & Digital Systems',
    difficulty: 'Easy',
    questionText: 'Which universal logic gate produces an output of logic \'0\' ONLY when all of its inputs are logic \'1\'?',
    options: [
      { id: 'a', text: 'NAND gate' },
      { id: 'b', text: 'NOR gate' },
      { id: 'c', text: 'XOR gate' },
      { id: 'd', text: 'AND gate' }
    ],
    correctOptionId: 'a',
    explanation: 'A NAND gate (NOT-AND) produces 0 only when all inputs are 1; for all other input combinations (e.g. 0,0 or 0,1), it outputs 1.'
  }
];
