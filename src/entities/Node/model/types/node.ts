export interface INode {
  id: number;
  orgboard_id: number; // id cхемы, к которому относится блок ветка
  parent_id: number; // id родителя
  name: string;
  description: string;
  description_secondary: string;
  color_block: string; // цвет блока
  color_branch: string; // цвет ветки
  sort: number; // сортировка вывода
  is_together: boolean;
  cloud: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
