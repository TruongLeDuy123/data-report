import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { GroupBySelector } from '../components/GroupBySelector';

const meta = {
  title: 'Components/GroupBySelector',
  component: GroupBySelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof GroupBySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ['date', 'campaign_id', 'platform', 'category'],
    value: [''],
  },
};

export const MultipleSelected: Story = {
  args: {
    options: ['date', 'campaign_id', 'platform', 'category'],
    value: ['date', 'category'],
  },
};
