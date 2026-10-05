import Icon from './Icon'

const nav = [
  { icon: 'radar', label: 'ค้นหาพัสดุ' },
  { icon: 'manage_history', label: 'ประวัติการค้นหา' },
  { icon: 'hub', label: 'สถิติและขนส่ง' },
  { icon: 'notifications_active', label: 'ตั้งค่าแจ้งเตือน' },
]

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
      <div className="w-full h-full px-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 min-w-[200px]">
            <img alt="NeonTrack Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJvhUdYZ4z3SJJHWgY-Ehp094wEnke1p-DojCMwlp8sZrZ6UEhN6HnEhweoa-CAAwiQppj3nKb3UPNDS0lZZCIPZL68WV4CaLJNKIJmLag-1WHZtRk6kSa1tD4xbNU18dWcFmdREWZGrPZSca7vJh9W98_lr8ikQeqcT482PPEjL4NMVsurMAMbjSp0wLYhC_VHi0lxvCkyPRGcOmVgLwf6DR35znKgRKJNawxs5PqIaV0yKh_XvM" />
            <div className="flex flex-col">
              <span className="font-headline font-bold text-lg tracking-wider text-on-surface uppercase">CYBERLOG</span>
              <span className="font-label text-[10px] tracking-widest text-secondary font-medium uppercase">NeonTrack Node 07</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-1.5">
            {nav.map((item, i) =>
              i === 0 ? (
                <a key={item.label} href="#" aria-current="page" className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all bg-primary-container text-on-primary-container font-semibold text-sm shadow-[0_0_15px_rgba(255,45,120,0.3)]">
                  <Icon name={item.icon} className="text-lg" />
                  <span>{item.label}</span>
                </a>
              ) : (
                <a key={item.label} href="#" className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all">
                  <Icon name={item.icon} className="text-lg" />
                  <span>{item.label}</span>
                </a>
              ),
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pl-4 bg-surface-container-low/70 py-1.5 px-3 rounded-full">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-headline font-bold text-on-surface leading-tight">คุณอมรา</span>
              <span className="font-label text-[10px] text-on-surface-variant">Logistics Lead</span>
            </div>
            <div className="relative">
              <img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVA27KmxtT1Q0s7GH-dcfoBNd8Z3EGFbLdTC4eTusmXFP96-1RA3n7mZA2Y1OS9wlBF-hlZ4CBk9BMkDx5qcBbnQYN9EbD1dDBtNLmlTjXQnMXPsihuhOq4GyWulep3FSup45qKAzr3AmMMAaLkN9qaSU_DPZfEqKNo81UJLB_cg3wtB8k9xwqJFYlcpefAjTyvmSdZZOe5wQ4_iy56uTKZ_v6-TWECuaieDAgx7sbJ-a6BLUW4Hk" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-secondary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
