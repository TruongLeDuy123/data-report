import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TimeBucketSelector } from '../components/TimeBucketSelector';

const meta = {
  title: 'Components/TimeBucketSelector',
  component: TimeBucketSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof TimeBucketSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
  },
};

export const Weekly: Story = {
  args: {
    value: 'weekly',
  },
};

export const Monthly: Story = {
  args: {
    value: 'monthly',
  },
};