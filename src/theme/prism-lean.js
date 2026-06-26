/**
 * @file Prism.js definition for Lean 4
 * @link https://lean-lang.org
 * @license MIT
 */
(function (Prism) {
  Prism.languages.lean = {
    'comment': [
      { // doc comment /-- ... -/
        pattern: /\/--[\s\S]*?-\//,
        greedy: true,
      },
      { // block comment /- ... -/  (non-nesting approximation)
        pattern: /\/-[\s\S]*?-\//,
        greedy: true,
      },
      { // line comment --
        pattern: /--.*/,
        greedy: true,
      },
    ],

    'string': {
      pattern: /"(?:\\.|[^"\\\r\n])*"/,
      greedy: true,
    },

    'attribute': {
      // @[simp], @[inline, reducible], ...
      pattern: /@\[[^\]]*\]/,
    },

    // function-like tokens, registered before `keyword` so the lookbehind
    // for definition names survives keyword tokenization
    'function': [
      { // name bound by a value-level declaration
        pattern: /(\b(?:def|abbrev|theorem|lemma|example|instance)\s+)[A-Za-z_][\w'.]*/,
        lookbehind: true,
      },
      { // tactics
        pattern: /\b(?:all_goals|any_goals|apply|assumption|aesop|by_cases|by_contra|bv_decide|cases|case|change|clear|congr|constructor|contradiction|conv|decide|delta|done|dsimp|erw|ext|existsi|fin_cases|field_simp|first|focus|funext|gcongr|generalize|induction|infer_instance|interval_cases|intros|intro|left|linarith|native_decide|next|nlinarith|norm_cast|norm_num|obtain|omega|only|polyrith|positivity|push_cast|rcases|refine|rename_i|repeat|revert|rewrite|rfl|ring_nf|ring|right|rw|simp_all|simp_rw|simp|skip|specialize|split|subst|tauto|trivial|try|unfold|use)\b/,
      },
    ],

    'important': /\b(?:admit|sorry|stop)\b/,

    'keyword': /\b(?:abbrev|attribute|axiom|by|calc|class|def|deriving|do|else|end|example|extends|forall|from|fun|have|if|import|inductive|infixl|infixr|infix|instance|in|let|local|macro_rules|macro|match|mutual|namespace|noncomputable|notation|nomatch|opaque|open|partial|postfix|prefix|prelude|private|protected|return|scoped|section|set_option|show|structure|suffices|syntax|theorem|lemma|then|unsafe|universe|variable|where|with|at)\b/,

    'builtin': /\b(?:Array|BEq|BitVec|Bool|Char|Decidable|DecidableEq|Empty|Eq|Except|Exists|Fin|Finset|Float|Function|Id|Int(?:8|16|32|64)?|IO|Iff|Lean|List|Nat|Not|Option|Ord|PEmpty|PUnit|Prod|Prop|Set|Sigma|Sort|StateM|String|Subtype|Sum|Type|UInt(?:8|16|32|64)|USize|Unit|Vector)\b/,

    'boolean': /\b(?:True|False|true|false)\b/,

    'class-name': /\b[A-Z][A-Za-z0-9_']*/,

    'property': /\.[A-Za-z_][\w']*/,

    'number': [
      { pattern: /\b0x[\da-f](?:_?[\da-f])*\b/i },
      { pattern: /\b0b[01](?:_?[01])*\b/i },
      { pattern: /\b0o[0-7](?:_?[0-7])*\b/i },
      { pattern: /\b\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:e[+-]?\d+)?\b/i },
    ],

    'operator': /:=|=>|<->|->|<-|\|-|<<<|>>>|\|\|\||&&&|\^\^\^|~~~|<<|>>|\+\+|::|\.\.|<\||\|>|<;>|&&|\|\||==|!=|<=|>=|[-+*/%^=<>|&~!?@$·]|[→←↔⇒⇐⊢∀∃λ¬∧∨∘∈∉∋⊆⊇⊂⊃∩∪≤≥≠≡≈≅×Σ∑Π∏⊕⊗∣∥↦∙⋆∗√∞⊥⊤]/,

    'punctuation': /[{}()[\],;:.⟨⟩⦃⦄⟦⟧]/,
  };

  // Lean 4 sources are commonly fenced as `lean4` too.
  Prism.languages.lean4 = Prism.languages.lean;
}(Prism));
