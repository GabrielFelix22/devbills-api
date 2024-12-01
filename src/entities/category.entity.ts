type CategoryProps = {
	id?: number;
	title: string;
	color: string;
};
export class Category {
	public id?: number;
	public title: string;
	public color: string;

	constructor({ id, color, title }: CategoryProps) {
		this.id = id;
		this.title = title;
		this.color = color.toUpperCase();
	}
}
