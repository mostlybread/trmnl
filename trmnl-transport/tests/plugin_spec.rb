# frozen_string_literal: true

# Run with `trmnlp test`. Uses the canned API answers in tests/fixtures, so it needs no API keys.
# `trmnlp test --update` re-records the pictures in tests/snapshots after a deliberate change.
# Docs: https://github.com/usetrmnl/trmnlp#testing-plugins
RSpec.describe 'Departures' do
  let(:fixtures) { File.join(__dir__, 'fixtures') }
  let(:arrivals) { JSON.parse(File.read(File.join(fixtures, 'tfl-arrivals.json'))) }
  let(:mocks) do
    {
      'https://api.tfl.gov.uk/StopPoint/490004972S/*' => { json: arrivals.select { |a| a['naptanId'] == '490004972S' } },
      'https://api.tfl.gov.uk/StopPoint/490004972N/*' => { json: arrivals.select { |a| a['naptanId'] == '490004972N' } },
      'https://api1.raildata.org.uk/*/DMK*' => { json: JSON.parse(File.read(File.join(fixtures, 'rail-denmark-hill.json'))) },
      'https://api1.raildata.org.uk/*/EDW*' => { json: JSON.parse(File.read(File.join(fixtures, 'rail-east-dulwich.json'))) }
    }
  end
  let(:custom_fields) do
    { 'bus_stop_1' => '490004972S', 'bus_stop_2' => '490004972N', 'station_crs' => 'DMK', 'second_station_crs' => 'EDW',
      'station_operators' => 'Thameslink, London Overground, Southeastern', 'rail_api_key' => 'test-key' }
  end
  let(:now) { '2026-10-15T12:00:00+01:00' }
  let(:device) { 'og_plus' }

  %w[full half_horizontal half_vertical quadrant].each do |view|
    it "draws the #{view} view as before" do
      expect(trmnl.render(view:, mocks:, custom_fields:, now:, device:)).to match_snapshot
    end
  end
end
