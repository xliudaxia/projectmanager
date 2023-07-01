export type BubbleItem = {
  id: number;
  title: string;
  status: boolean;
};


export interface BubbleListProps {
  loading: boolean;
  /** 待办列表 */
  bubbleList: BubbleItem[];
  /** 更新待办状态 */
  triggerBubbleStatus: (id: number, status: boolean) => void;
  /** 删除待办 */
  handleBubbleDelete: (id: number) => void;
}
