// Constants
const functionExpression = "x"; // Example: f(x) = x^2
const desiredArcLength = 10; // Desired arc length in units

// Convert the string expression into executable functions
const f = new Function("x", `return ${functionExpression};`); // Function f(x)
const fPrime = new Function("x", `return ${derive(functionExpression)};`); // Derivative f'(x)

// Utility function to derive a simple polynomial function string
function derive(expression) {
    if (expression.includes("**")) {
        // Basic power rule: x**n -> n*x**(n-1)
        return expression.replace(/x\s*\*\*\s*(\d+)/g, (_, exp) => {
            const newExp = Number(exp) - 1;
            return newExp === 0 ? exp : `${exp} * x ** ${newExp}`;
        });
    }
    // Extend for more complex cases if needed
    throw new Error("Automatic differentiation is limited to x**n.");
}

// Arc length integrand
function arcLengthIntegrand(x) {
    return Math.sqrt(1 + fPrime(x) ** 2);
}

// Numerical integration using the trapezoidal rule
function integrateArcLength(start, end, steps = 1000) {
    const dx = (end - start) / steps;
    let total = 0;

    for (let i = 0; i < steps; i++) {
        const x1 = start + i * dx;
        const x2 = x1 + dx;
        total += (arcLengthIntegrand(x1) + arcLengthIntegrand(x2)) / 2 * dx;
    }
    return total;
}

// Find x where the arc length reaches a specific distance
function findXForArcLength(targetLength, tolerance = 1e-6, maxIterations = 1000) {
    let lower = 0; // Start at x = 0
    let upper = 10; // Initial guess for upper bound
    let iterations = 0;

    // Increase upper bound until arc length exceeds targetLength
    while (integrateArcLength(0, upper) < targetLength) {
        upper *= 2; // Expand the search range
        if (upper > 1e6) {
            throw new Error("Target distance is too large.");
        }
    }

    // Use binary search to find the precise x
    while (upper - lower > tolerance && iterations < maxIterations) {
        const mid = (lower + upper) / 2;
        const length = integrateArcLength(0, mid);

        if (length < targetLength) {
            lower = mid; // Move right
        } else {
            upper = mid; // Move left
        }
        iterations++;
    }

    if (iterations === maxIterations) {
        throw new Error("Max iterations reached without convergence.");
    }

    return (lower + upper) / 2; // Return the midpoint as the result
}

// Solve for the desired arc length
try {
    const result = findXForArcLength(desiredArcLength);
    console.log(
        `The arc length of f(x) = ${functionExpression} reaches ${desiredArcLength} units at x ≈ ${result.toFixed(6)}.`
    );
} catch (error) {
    console.error("Error:", error.message);
}
