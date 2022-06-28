type Moods =
	| "Cheerful"
	| "Reflective"
	| "Gloomy"
	| "Humorous"
	| "Melancholy"
	| "Idyllic"
	| "Whimsical"
	| "Romantic"
	| "Mysterious"
	| "Ominous"
	| "Calm"
	| "Lighthearted"
	| "Hopeful"
	| "Angry"
	| "Fearful"
	| "Tense"
	| "Lonely";

interface IPost {
	postedOn: string;
	postedBy: string;
	mood: Moods;
	text: string;
}

export default IPost;
