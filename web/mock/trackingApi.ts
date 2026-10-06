import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import type { CourierId, TrackingData } from '../src/features/tracking/types.ts'

// Dev/preview-only mock of POST /api/tracking (see requirements/flow1.md).

const COURIERS: Record<CourierId, string> = {
  flash: 'Flash Express',
  thp: 'ไปรษณีย์ไทย (EMS)',
  kex: 'KEX Express (Kerry)',
}

function courierFor(code: string): CourierId {
  const upper = code.toUpperCase()
  if (upper.startsWith('EF') || upper.startsWith('ED')) return 'thp'
  if (upper.startsWith('KE')) return 'kex'
  return 'flash'
}

function buildTracking(trackingCode: string): TrackingData {
  const courierId = courierFor(trackingCode)
  const courierName = COURIERS[courierId]
  return {
    trackingCode,
    courierId,
    courierName,
    description: 'พัสดุด่วน Gadget อิเล็กทรอนิกส์',
    weightKg: 1.45,
    eta: 'วันนี้ ภายใน 16:30 น.',
    sender: { name: 'CyberHub BKK (พระราม 9)', address: 'กรุงเทพมหานคร 10310' },
    receiver: { name: 'คุณอมรา (Logistics Lead)', address: 'แขวงจอมพล เขตจตุจักร ลาดพร้าว กทม. 10900' },
    timeline: [
      { icon: 'task_alt', title: 'นำส่งสำเร็จ (Package Delivered)', time: '16:30 น. (ประมาณการ)', desc: 'รอเซ็นรับพัสดุผ่าน Smart Sign OTP', state: 'pending' },
      { icon: 'two_wheeler', title: 'พนักงานกำลังนำจ่ายพัสดุ', time: 'วันนี้ 10:20 น.', desc: '', state: 'active' },
      { icon: 'domain', title: 'สินค้าถึงสาขาปลายทาง (DC ลาดพร้าว)', time: 'วันนี้ 07:15 น.', desc: 'คัดแยกสู่สายนำจ่ายพื้นที่ Zone 4-จตุจักรเรียบร้อย', state: 'done' },
      { icon: 'hub', title: 'ศูนย์คัดแยกสินค้าหลัก (Sort Center ลาดกระบัง)', time: 'เมื่อวาน 13:45 น.', desc: 'ตรวจสอบสภาพบรรจุภัณฑ์และส่งต่อรถบรรทุกขนส่งข้ามเขต', state: 'done' },
      { icon: 'inventory_2', title: 'เข้ารับพัสดุแล้ว (Hub พระราม 9)', time: 'เมื่อวาน 09:30 น.', desc: `บันทึกข้อมูลเข้าระบบ ${courierName} Node BKK-09`, state: 'done' },
    ],
  }
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', (chunk) => (raw += chunk))
    req.on('end', () => resolve(raw))
    req.on('error', reject)
  })
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

/** Vite plugin serving the mock endpoint in `dev` and `preview`. */
export function mockTrackingApi(): Plugin {
  const handler = async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (req.url?.split('?')[0] !== '/api/tracking' || req.method !== 'POST') return next()
    try {
      const { trackingCode } = JSON.parse((await readBody(req)) || '{}') as { trackingCode?: unknown }
      if (typeof trackingCode !== 'string' || !/^[a-zA-Z0-9]{10}$/.test(trackingCode)) {
        return send(res, 400, { error: 'Invalid tracking code.' })
      }
      send(res, 200, { data: buildTracking(trackingCode) })
    } catch {
      send(res, 500, { error: 'Internal server error.' })
    }
  }
  return {
    name: 'mock-tracking-api',
    configureServer: (server) => void server.middlewares.use(handler),
    configurePreviewServer: (server) => void server.middlewares.use(handler),
  }
}
