import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Card } from '../../WasteManagement/components/Shared';

const TasksPage = () => {
    return (
        <div className="tasks-page-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
            <div className="tasks-sidebar">

                <TaskForm />

            </div>
            <div className="tasks-main">
                <Card>
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Active Tasks</h3>
                    <TaskList />
                </Card>
            </div>
        </div>
    );
};

export default TasksPage;
