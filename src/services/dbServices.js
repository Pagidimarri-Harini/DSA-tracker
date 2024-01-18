// const TopicModel = require('./models/ProblemData');

// export async function insertData(callback) {
//   try {
//     await TopicModel.insertMany(QuestionData.map((topic, index) => ({
//       topicName: topic.topicName,
//       position: index,
//       started: topic.started,
//       doneQuestions: topic.doneQuestions,
//       questions: topic.questions,
//     })));
//     getData(callback);
//   } catch (error) {
//     console.error('Error inserting data:', error);
//   }
// }

// export async function getData(callback) {
//   try {
//     const data = await TopicModel.find().sort({ position: 1 });
//     if (data.length === 0) {
//       await insertData(callback);
//     } else {
//       // Update data as needed
//       return callback(data);
//     }
//   } catch (error) {
//     console.error('Error getting data:', error);
//   }
// }

// export async function getTopicData(key, callback) {
//   try {
//     const document = await TopicModel.findOne({ topicName: key });
//     callback(document);
//   } catch (error) {
//     console.error('Error getting topic data:', error);
//   }
// }

// export async function updateDBData(key, updateData) {
//   try {
//     await TopicModel.updateOne({ topicName: key }, { $set: updateData });
//   } catch (error) {
//     console.error('Error updating data:', error);
//   }
// }

// export async function resetDBData(callback) {
//   try {
//     await TopicModel.deleteMany({});
//     callback({ success: true });
//   } catch (error) {
//     console.error('Error resetting data:', error);
//   }
// }

// export async function exportDBData(callback) {
//   try {
//     const data = await TopicModel.find();
//     callback(data);
//   } catch (error) {
//     console.error('Error exporting data:', error);
//   }
// }

// export async function importDBData(data, callback) {
//   try {
//     await TopicModel.insertMany(data);
//     getData(callback);
//   } catch (error) {
//     console.error('Error importing data:', error);
//   }
// }
