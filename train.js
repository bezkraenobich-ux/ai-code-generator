const tf = require('@tensorflow/tfjs');
// Use CPU backend for Node.js
require('@tensorflow/tfjs-node');

// Training data for different languages
const trainingData = {
    javascript: [
        'function factorial(n) {\n    if (n === 0 || n === 1) {\n        return 1;\n    }\n    return n * factorial(n - 1);\n}\nconsole.log(factorial(5));',
        'function sumArray(arr) {\n    return arr.reduce((sum, num) => sum + num, 0);\n}\nconst numbers = [1, 2, 3, 4, 5];\nconsole.log(sumArray(numbers));'
    ],
    python: [
        'def factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    return n * factorial(n - 1)\nprint(factorial(5))',
        'def sum_list(lst):\n    return sum(lst)\nnumbers = [1, 2, 3, 4, 5]\nprint(sum_list(numbers))'
    ]
};

let model;
let vocabSize;
let charToIndex = {};
let indexToChar = {};

// Sample from probability distribution
function sampleFromDistribution(probs) {
    const rand = Math.random();
    let cumulative = 0;
    for (let i = 0; i < probs.length; i++) {
        cumulative += probs[i];
        if (rand < cumulative) {
            return i;
        }
    }
    return probs.length - 1;
}

// Initialize model
async function initModel() {
    console.log('Initializing neural network...');

    // Create vocabulary
    const allChars = new Set();
    Object.values(trainingData).flat().forEach(code => {
        for (let char of code) {
            allChars.add(char);
        }
    });

    const chars = Array.from(allChars).sort();
    vocabSize = chars.length;

    chars.forEach((char, index) => {
        charToIndex[char] = index;
        indexToChar[index] = char;
    });

    console.log(`Vocabulary size: ${vocabSize}`);

    // Create optimized model with 5 hidden layers and 512 neurons each (balanced performance)
    model = tf.sequential();
    model.add(tf.layers.lstm({
        units: 512,
        inputShape: [null, vocabSize],
        returnSequences: true,
        kernelInitializer: 'glorotNormal',
        recurrentInitializer: 'glorotNormal'
    }));
    model.add(tf.layers.lstm({
        units: 512,
        returnSequences: true,
        kernelInitializer: 'glorotNormal',
        recurrentInitializer: 'glorotNormal'
    }));
    model.add(tf.layers.lstm({
        units: 512,
        returnSequences: true,
        kernelInitializer: 'glorotNormal',
        recurrentInitializer: 'glorotNormal'
    }));
    model.add(tf.layers.lstm({
        units: 512,
        returnSequences: true,
        kernelInitializer: 'glorotNormal',
        recurrentInitializer: 'glorotNormal'
    }));
    model.add(tf.layers.lstm({
        units: 512,
        returnSequences: true,
        kernelInitializer: 'glorotNormal',
        recurrentInitializer: 'glorotNormal'
    }));
    model.add(tf.layers.dense({
        units: vocabSize,
        activation: 'softmax',
        kernelInitializer: 'glorotNormal'
    }));

    model.compile({optimizer: 'adam', loss: 'categoricalCrossentropy'});

    console.log('Model initialized successfully');
}

// Train model for a specific language
async function trainModel(language) {
    try {
        if (!trainingData[language]) {
            throw new Error(`No training data available for language: ${language}`);
        }

        const maxSeqLen = 50; // Maximum sequence length for training
        const xTrain = [];
        const yTrain = [];

        trainingData[language].forEach(code => {
            for (let i = 0; i <= code.length - maxSeqLen - 1; i++) {
                const seq = code.substring(i, i + maxSeqLen);
                const target = code.substring(i + 1, i + maxSeqLen + 1);

                const x = seq.split('').map(char => {
                    const vec = Array(vocabSize).fill(0);
                    if (charToIndex[char] !== undefined) {
                        vec[charToIndex[char]] = 1;
                    }
                    return vec;
                });

                const y = target.split('').map(char => {
                    const vec = Array(vocabSize).fill(0);
                    if (charToIndex[char] !== undefined) {
                        vec[charToIndex[char]] = 1;
                    }
                    return vec;
                });

                xTrain.push(x);
                yTrain.push(y);
            }
        });

        if (xTrain.length === 0) {
            throw new Error('No training data could be prepared');
        }

        const xs = tf.tensor3d(xTrain, [xTrain.length, maxSeqLen, vocabSize]);
        const ys = tf.tensor3d(yTrain, [xTrain.length, maxSeqLen, vocabSize]);

        console.log(`Training model for ${language} with ${xTrain.length} samples, sequence length ${maxSeqLen}...`);

        await model.fit(xs, ys, {
            epochs: 1, // Reduced epochs for testing
            batchSize: 2, // Smaller batch size
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}`);
                }
            }
        });

        xs.dispose();
        ys.dispose();

        console.log(`Model trained successfully for ${language}`);
    } catch (error) {
        console.error('Error during model training:', error);
        throw error;
    }
}

// Generate code using the trained model
async function generateCode(prompt, language, maxLength = 200) {
    if (!model) {
        throw new Error('Model not initialized');
    }

    let generated = prompt;

    for (let i = 0; i < maxLength; i++) {
        const input = Array(vocabSize).fill(0);
        if (generated.length > 0) {
            const lastChar = generated[generated.length - 1];
            if (charToIndex[lastChar] !== undefined) {
                input[charToIndex[lastChar]] = 1;
            }
        }

        const prediction = model.predict(tf.tensor3d([[input]], [1, 1, vocabSize]));
        const predictionData = await prediction.data();
        const probabilities = predictionData[0][0];

        // Sample from distribution
        const randomIndex = sampleFromDistribution(probabilities);
        const nextChar = indexToChar[randomIndex];

        if (nextChar === '\n' && generated.endsWith('\n\n')) break;
        generated += nextChar;

        prediction.dispose();
    }

    return generated;
}

// Save model
async function saveModel() {
    if (!model) {
        throw new Error('No model to save');
    }

    await model.save('file://./model');
    console.log('Model saved to ./model directory');
}

// Main training function
async function main() {
    try {
        console.log('Starting AI Code Generator Training...\n');

        // Initialize model
        await initModel();

        // Train for each language
        const languages = Object.keys(trainingData);
        for (const language of languages) {
            console.log(`\n--- Training ${language.toUpperCase()} ---\n`);
            await trainModel(language);
        }

        console.log('\n--- Training Complete ---\n');

        // Test generation
        console.log('Testing code generation...\n');
        for (const language of ['javascript', 'python']) {
            console.log(`${language.toUpperCase()} Example:`);
            const code = await generateCode(`function `, language, 100);
            console.log(code.substring(0, 200) + '...\n');
        }

        // Save the trained model
        await saveModel();

        console.log('Training completed successfully!');

    } catch (error) {
        console.error('Training failed:', error);
        process.exit(1);
    }
}

// Run training
if (require.main === module) {
    main();
}

module.exports = { initModel, trainModel, generateCode, saveModel };