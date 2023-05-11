export default interface ITool {
    id: number;
    name: string;
    description: string;
    image: string;
    steps: IStep[];
}