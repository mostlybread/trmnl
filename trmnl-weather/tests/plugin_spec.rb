# frozen_string_literal: true

# Run with `trmnlp test`. Uses a canned Open-Meteo answer in tests/fixtures, so it needs no network.
# `trmnlp test --update` re-records the pictures in tests/snapshots after a deliberate change.
# Docs: https://github.com/usetrmnl/trmnlp#testing-plugins
RSpec.describe 'Weather' do
  let(:mocks) do
    { 'https://api.open-meteo.com/*' => { json: JSON.parse(File.read(File.join(__dir__, 'fixtures', 'open-meteo.json'))) } }
  end
  let(:custom_fields) { { 'location' => '51.4660,-0.0880', 'place_name' => 'Denmark Hill' } }
  let(:now) { '2026-10-16T13:05:00+01:00' }
  let(:device) { 'og_plus' }

  %w[full half_horizontal half_vertical quadrant].each do |view|
    it "draws the #{view} view as before" do
      expect(trmnl.render(view:, mocks:, custom_fields:, now:, device:)).to match_snapshot
    end
  end
end
