import type { Meta, StoryObj } from '@storybook/react-vite';
import { PreviewTable } from '../components/PreviewTable';

const meta = {
  title: 'Components/PreviewTable',
  component: PreviewTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PreviewTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: [],
  },
};

export const WithGroupBy: Story = {
  args: {
    rows: [
      { date: '2025-01-01', campaign_id: 'CMP-001', platform: 'FB' },
      { date: '2025-01-02', campaign_id: 'CMP-002', platform: 'Google' },
      { date: '2025-01-03', campaign_id: 'CMP-003', platform: 'Google' },
    ],
    groupBy: ['date'],
  },
};