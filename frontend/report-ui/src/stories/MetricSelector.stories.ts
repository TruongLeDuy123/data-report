import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { MetricsSelector } from '../components/MetricSelector';

const meta = {
  title: 'Components/MetricsSelector',
  component: MetricsSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof MetricsSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    metrics: ['date', 'campaign_id', 'campaign_name', 'platform', 'spend', 'clicks', 'impressions', 'conversions', 'ctr', 'cpc', 'category'],
    value: [''],
  },
};

export const MultipleSelected: Story = {
  args: {
    metrics: ['date', 'campaign_id', 'campaign_name', 'platform', 'spend', 'clicks', 'impressions', 'conversions', 'ctr', 'cpc', 'category'],
    value: ['date', 'campaign_name', 'platform'],
  },
};
