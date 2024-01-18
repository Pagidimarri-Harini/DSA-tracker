// const Question = require('../models/ProblemData.js');
// export async function insertData(callback) {
//     try {
//       for (const topic of QuestionData) {
//         await Question.create(topic);
//       }
//       getData(callback);
//     } catch (error) {
//       console.error('Error inserting data:', error);
//     }
//   }
  
//   // Example: Get Data
//   export function getData(callback) {
//     Question.find()
//       .sort({ position: 1 })
//       .exec((err, data) => {
//         if (err || data.length === 0) {
//           insertData(callback);
//         } else {
//           // Your existing logic for updating data
//           return callback(data);
//         }
//       });
//   }
  
//   // Similar changes for other functions...
  
//   export async function getTopicData(key, callback) {
//     try {
//       const document = await Question.findOne({ topicName: key });
//       callback(document);
//     } catch (error) {
//       console.error('Error getting topic data:', error);
//     }
//   }
  
//   export async function updateDBData(key, updateData) {
//     try {
//       await Question.findOneAndUpdate({ topicName: key }, updateData);
//     } catch (error) {
//       console.error('Error updating data:', error);
//     }
//   }
  
//   export async function resetDBData(callback) {
//     try {
//       await Question.deleteMany({});
//       callback({ success: true });
//     } catch (error) {
//       console.error('Error resetting data:', error);
//       callback({ success: false, error });
//     }
//   }
  
//   export function exportDBData(callback) {
//     Question.find()
//       .sort({ position: 1 })
//       .exec((err, data) => {
//         if (err) {
//           console.error('Error exporting data:', err);
//         } else {
//           callback(data);
//         }
//       });
//   }
  
//   export async function importDBData(data, callback) {
//     try {
//       await resetDBData();
//       for (const topic of data) {
//         await Question.create(topic);
//       }
//       getData((data) => {
//         callback(data);
//       });
//     } catch (error) {
//       console.error('Error importing data:', error);
//       callback(null);
//     }
//   }