import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { AggregationSelector } from '../components/AggregateSelector';

const meta = {
  title: 'Components/AggregationSelector',
  component: AggregationSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof AggregationSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ['spend', 'clicks', 'impressions'],
    value: {},
  },
};

export const AllSelected: Story = {
  args: {
    options: ['spend', 'clicks', 'impressions'],
    value: { spend: 'sum', clicks: 'mean', impressions: 'max' },
  },
};