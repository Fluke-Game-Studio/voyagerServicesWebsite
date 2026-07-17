/**
 * Single source of truth for Voyager Services site copy, sourced from the
 * "Investor & Partner Pitch" deck. Sections consume this so the UI stays
 * data-driven and easy to edit.
 */
import type { LucideIcon } from 'lucide-react'
import {
  Boxes,
  ClipboardList,
  Truck,
  Layers,
  Radio,
  Factory,
  Warehouse,
  Route,
  LineChart,
  Network,
  Eye,
  Search,
  Ship,
  PackageCheck,
  Send,
  PackageOpen,
  MapPin,
} from 'lucide-react'

export const BRAND = {
  name: 'Voyager Services',
  tagline: 'Managed U.S. Supply Chain for Global Manufacturers',
  promise: 'You manufacture. We coordinate. You sell. We deliver.',
  hero:
    'Enter and scale in the U.S. without building warehouses, hiring logistics teams, or stitching together fragmented providers.',
  email: 'partners@voyagerservices.co',
}

/* ---- Slide 5: process ---- */
export const PROCESS_STEPS: { n: number; title: string; body: string; icon: LucideIcon }[] = [
  { n: 1, title: 'Customer Assessment', body: 'Product, pallet, SKU, handling and destination profile.', icon: Search },
  { n: 2, title: 'Network Design', body: 'Warehouse market and partner selection.', icon: Network },
  { n: 3, title: 'Inbound Coordination', body: 'Truck from port/origin to warehouse; customs optional.', icon: Ship },
  { n: 4, title: 'Warehouse Receiving', body: 'Receive, inspect, palletize and record inventory.', icon: PackageCheck },
  { n: 5, title: 'Inventory Visibility', body: 'Stock levels, locations, lots and aging.', icon: Eye },
  { n: 6, title: 'Release Instruction', body: 'Customer triggers fulfillment or transfer.', icon: Send },
  { n: 7, title: 'Outbound Execution', body: 'Pick, pack, label, palletize and ship.', icon: PackageOpen },
  { n: 8, title: 'Final Delivery', body: 'Status, POD, exception tracking and KPI report.', icon: MapPin },
]

/* ---- Slide 6: service scope ---- */
export const SERVICES: { title: string; icon: LucideIcon; items: string[] }[] = [
  {
    title: 'Warehousing',
    icon: Warehouse,
    items: ['Flexible storage', 'Short / long-term capacity', 'Multi-region partner network', 'Overflow & seasonal storage'],
  },
  {
    title: 'Inventory Management',
    icon: ClipboardList,
    items: ['Receiving control', 'SKU, lot & serial tracking', 'Cycle count coordination', 'Aging & stock reporting'],
  },
  {
    title: 'Transportation',
    icon: Truck,
    items: ['FTL / LTL / Parcel coordination', 'Port-to-warehouse drayage', 'Appointment scheduling', 'POD & exception tracking'],
  },
  {
    title: 'Value-Added Services',
    icon: Layers,
    items: ['Palletization / labeling', 'Kitting & rework', 'Returns processing', 'Cross-docking'],
  },
  {
    title: 'Control Tower',
    icon: Radio,
    items: ['Single point of contact', 'Partner management', 'KPI dashboards', 'Monthly optimization review'],
  },
]

/* ---- Slide 8: differentiators ---- */
export const DIFFERENTIATORS: string[] = [
  'Manufacturing / import focus',
  'Transparent cost + management fee',
  'Partner-agnostic network',
  'Transportation + warehouse visibility',
  'Scales from service to platform',
]

/* ---- Slide 4: control tower nodes ---- */
export const NETWORK_NODES: { label: string; icon: LucideIcon }[] = [
  { label: 'Manufacturer', icon: Factory },
  { label: 'Warehouse Partners', icon: Warehouse },
  { label: 'Transportation', icon: Truck },
  { label: 'Brokers / Customs', icon: ClipboardList },
  { label: 'Final Delivery', icon: Route },
  { label: 'Reporting', icon: LineChart },
]

/* ---- Slide 12: audiences ---- */
export const AUDIENCES: { value: string; title: string; body: string; icon: LucideIcon }[] = [
  {
    value: 'manufacturer',
    title: 'Manufacturers',
    body: 'Enter the U.S. with a managed warehousing + distribution process and transparent reporting.',
    icon: Factory,
  },
  {
    value: 'warehouse',
    title: 'Warehouse Partners',
    body: 'Provide flexible capacity and receiving/fulfillment services; monetize unused space.',
    icon: Warehouse,
  },
  {
    value: 'logistics',
    title: 'Logistics Partners',
    body: 'Support drayage, FTL/LTL/parcel, customs coordination and exception execution.',
    icon: Truck,
  },
  {
    value: 'investor',
    title: 'Investors / Advisors',
    body: 'Help fund technology buildout, partner onboarding, sales pipeline and compliance.',
    icon: LineChart,
  },
]

export const SERVICE_ICON = Boxes
