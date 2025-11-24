export class CreateItemDto {
  itemName: string;
  description: string;
  quantity: string;
  purchased?: boolean;
}
