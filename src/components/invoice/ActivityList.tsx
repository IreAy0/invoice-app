import React from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { activities } from '../../data/sample'
import { ActivityItem } from './ActivityItem'

export function ActivityList() {
  return (
    <Card className='p-6 md:p-8'>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Activities</h3>
        <Button variant="ghost" 
        className='!text-main_blue-100 px-6 uppercase tracking-[0.08em] text-xs' size="sm">View all</Button>
      </div>
      <div className="mt-4 space-y-3">
        {activities.map((a) => (
          <ActivityItem key={a.id} a={a} />
        ))}
      </div>
    </Card>
  )
}