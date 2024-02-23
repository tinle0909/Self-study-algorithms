function strongPasswordChecker(password: string): number {
  if (password.length < 3) {
    return 6 - password.length;
  }
  let missingFixCount = 0;
  const numberIsMissing = !new RegExp(/\d+/).test(password);
  const lowerCaseIsMissing = !new RegExp(/([a-z])+/).test(password);
  const upperCaseIsMissing = !new RegExp(/([A-Z])+/).test(password);
  missingFixCount += numberIsMissing ? 1 : 0;
  missingFixCount += lowerCaseIsMissing ? 1 : 0;
  missingFixCount += upperCaseIsMissing ? 1 : 0;
  const repeatingPatterns = password.match(/(.)\1{2,}/g) ?? [];
  const repeatingPatternLengths = repeatingPatterns.map((item) => item.length);
  if (password.length < 7) {
    let steps = 0;
    for (let pattern of repeatingPatterns) {
      steps += pattern.length / 3;
    }
    steps = Math.max(steps, missingFixCount);
    let missingCharCount = 6 - password.length;
    return Math.max(missingCharCount, steps);
  }
  if (password.length <= 20) {
    let steps = 0;
    for (let pattern of repeatingPatterns) {
      steps += pattern.length / 3;
    }
    return Math.max(steps, missingFixCount);
  }
  let deleteSteps = 0;
  const excessLength = password.length - 20;
  for (
    let index = 0;
    index < repeatingPatternLengths.length && deleteSteps < excessLength;
    index++
  ) {
    let length = repeatingPatternLengths[index];
    let remainder = length % 3;
    if (remainder === 0) {
      deleteSteps += 1;
      repeatingPatternLengths[index] -= 1;
    }
  }
  for (
    let index = 0;
    index < repeatingPatternLengths.length && deleteSteps < excessLength;
    index++
  ) {
    let length = repeatingPatternLengths[index];
    let remainder = length % 3;
    if (remainder === 1) {
      deleteSteps += 2;
      repeatingPatternLengths[index] -= 2;
    }
  }
  for (let index = 0; index < repeatingPatternLengths.length; index++) {
    while (
      3 <= excessLength - deleteSteps &&
      repeatingPatternLengths[index] > 2
    ) {
      deleteSteps += 3;
      repeatingPatternLengths[index] -= 3;
    }
  }
  let replaceSteps = 0;
  repeatingPatternLengths.forEach(
    (item) => (replaceSteps += Math.floor(item / 3))
  );
  return (
    Math.max(excessLength, deleteSteps) +
    Math.max(replaceSteps, missingFixCount)
  );
}
